import "server-only";

import { firefishRequest } from "./client";

export type FirefishLegalBasis =
  | "consent-request"
  | "consent-provided"
  | "legitimate-interest"
  | "not-applicable-at-this-stage";

export type FirefishPermanentStatus =
  | "actively-looking"
  | "immediately-available"
  | "happy-in-current-position"
  | "passively-looking"
  | "placed-by-us"
  | "not-interested"
  | string;

export type FirefishContractStatus =
  | "actively-looking"
  | "immediately-available"
  | "contracting-through-us"
  | "currently-in-contract"
  | "passively-looking"
  | "not-interested"
  | string;

export type FirefishAddress = {
  Address1?: string | null;
  Address2?: string | null;
  Address3?: string | null;
  Town?: string | null;
  County?: string | null;
  Country?: string | null;
  PostCode?: string | null;
};

export type FirefishCandidateSearchResult = {
  Ref: number;
  FirstName: string | null;
  Surname: string | null;
  DateOfBirth?: string | null;
  JobTitle?: string | null;
  EmailAddress: string | null;
  Address?: FirefishAddress | null;
  MobileNumber?: string | null;
  HomeNumber?: string | null;
  WorkNumber?: string | null;
  IsArchived?: boolean;
  CreatedBy?: string | null;
  Created?: string | null;
  UpdatedBy?: string | null;
  Updated?: string | null;
  LastActionRef?: number | null;
  LastActionName?: string | null;
  LastActionDate?: string | null;
};

export type FirefishCandidateProfile = {
  Ref: number;
  Title?: string | null;
  FirstName: string | null;
  Surname: string | null;
  KnownAs?: string | null;
  Gender?: string | null;
  Source: string | null;
  Status?: string | null;
  AvailableDate?: string | null;
  DateOfBirth?: string | null;
  JobTitle?: string | null;
  EmailAddress: string | null;
  Address?: FirefishAddress | null;
  MobileNumber?: string | null;
  HomeNumber?: string | null;
  WorkNumber?: string | null;
  OwnerUserRef?: number | null;
  OwnerUser?: string | null;
  OwnerUserEmail?: string | null;
  CurrentCompanyName?: string | null;
  IsArchived?: boolean;
  RegistrationActionName?: string | null;
  EmailMarketing?: boolean;
  SmsMarketing?: boolean;
  PostalMarketing?: boolean;
  HasPreferenceJobAlert?: boolean;
  HasBespokeJobAlert?: boolean;
  HasCandidateLogin?: boolean;
  LastLoginDate?: string | null;
  HasCv?: boolean;
  HasFormattedCv?: boolean;
  Skills?: string | null;
  Languages?: string | null;
  PermanentStatus?: FirefishPermanentStatus | null;
  ContractStatus?: FirefishContractStatus | null;
  CurrentSalary?: number | null;
  DesiredSalary?: number | null;
  HotStatus?: boolean;
  OwnTransport?: boolean;
  LinkedIn?: string | null;
  Video?: string | null;
  StarRating?: number | null;
  RecruiterSummary?: string | null;
  CandidateSummary?: string | null;
  CreatedBy?: string | null;
  Created?: string | null;
  UpdatedBy?: string | null;
  Updated?: string | null;
  CandidateURL?: string | null;
};

export type CreateFirefishCandidateInput = {
  FirstName: string;
  Surname: string;
  Source: string;
  EmailAddress: string;
  LegalBasis: FirefishLegalBasis;
  JobTitle?: string;
  Address?: FirefishAddress;
  MobileNumber?: string;
  HomeNumber?: string;
  WorkNumber?: string;
  EmailMarketing?: boolean;
  SMSMarketing?: boolean;
  PostalMarketing?: boolean;
  HasPreferenceJobAlerts?: boolean;
  LinkedIn?: string;
  CandidateSummary?: string;
  PermanentStatus?: FirefishPermanentStatus;
  ContractStatus?: FirefishContractStatus;
  OwnerUserEmail?: string;
};

type CreateFirefishCandidateResponse = {
  Ref: number;
};

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

function flattenCandidateSearchResponse(
  value: unknown
): FirefishCandidateSearchResult[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flat(Infinity).filter((item): item is FirefishCandidateSearchResult => {
    return (
      typeof item === "object" &&
      item !== null &&
      typeof (item as FirefishCandidateSearchResult).Ref === "number"
    );
  });
}

export async function findCandidateByExactEmail(
  email: string
): Promise<FirefishCandidateSearchResult | null> {
  const normalisedEmail = normaliseEmail(email);

  if (!normalisedEmail) {
    throw new Error("Candidate email address is required.");
  }

  const query = new URLSearchParams({
    "email-address": normalisedEmail,
    "from-date": "2000-01-01",
    "include-archived": "true",
  });

  const response = await firefishRequest<unknown>(
    `/api/v1.0/candidates/search?${query.toString()}`
  );

  const results = flattenCandidateSearchResponse(response);

  return (
    results.find((candidate) => {
      return (
        typeof candidate.EmailAddress === "string" &&
        normaliseEmail(candidate.EmailAddress) === normalisedEmail
      );
    }) ?? null
  );
}

export async function getCandidateProfile(
  candidateRef: number
): Promise<FirefishCandidateProfile> {
  if (!Number.isInteger(candidateRef) || candidateRef <= 0) {
    throw new Error("A valid Firefish candidate reference is required.");
  }

  const profile = await firefishRequest<FirefishCandidateProfile>(
    `/api/v1.0/candidates/${candidateRef}`
  );

  if (!profile) {
    throw new Error("Firefish did not return the candidate profile.");
  }

  return profile;
}

export async function createCandidate(
  input: CreateFirefishCandidateInput
): Promise<number> {
  const response = await firefishRequest<CreateFirefishCandidateResponse>(
    "/api/v1.0/candidates/",
    {
      method: "POST",
      body: input,
    }
  );

  if (!response || !Number.isInteger(response.Ref) || response.Ref <= 0) {
    throw new Error(
      "Firefish created the candidate but did not return a valid reference."
    );
  }

  return response.Ref;
}

export async function uploadCandidateCv(
  candidateRef: number,
  cv: Blob,
  filename: string
): Promise<void> {
  if (!Number.isInteger(candidateRef) || candidateRef <= 0) {
    throw new Error("A valid Firefish candidate reference is required.");
  }

  const cleanFilename = filename.trim();

  if (!cleanFilename) {
    throw new Error("The CV filename is required.");
  }

  if (cv.size <= 0) {
    throw new Error("The CV file is empty.");
  }

  if (cv.size > 10 * 1024 * 1024) {
    throw new Error("The CV must be no larger than 10 MB.");
  }

  const formData = new FormData();
  formData.set("type", "CV");
  formData.set("files", cv, cleanFilename);

  await firefishRequest(
    `/api/v1.0/candidates/${candidateRef}/documents`,
    {
      method: "POST",
      body: formData,
    }
  );
}