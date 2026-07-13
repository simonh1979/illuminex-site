import "server-only";

import { firefishRequest } from "./client";

export type FirefishContactSearchResult = {
  Ref: number;
  FirstName: string | null;
  Surname: string | null;
  Title?: string | null;
  CompanyRef?: number | null;
  CompanyName?: string | null;
  CompanyPhone?: string | null;
  JobTitle?: string | null;
  EmailAddress: string | null;
  MobileNumber?: string | null;
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

type FirefishContactSearchResponse = {
  Results?: FirefishContactSearchResult[];
  TotalPages?: number;
  TotalCount?: number;
};

function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}

function extractContactResults(
  value: FirefishContactSearchResponse | FirefishContactSearchResult[] | null
): FirefishContactSearchResult[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return Array.isArray(value.Results) ? value.Results : [];
}

export async function findContactByExactEmail(
  email: string
): Promise<FirefishContactSearchResult | null> {
  const normalisedEmail = normaliseEmail(email);

  if (!normalisedEmail) {
    throw new Error("Contact email address is required.");
  }

  const query = new URLSearchParams({
    "email-address": normalisedEmail,
    "from-date": "2000-01-01",
    "include-archived": "true",
    page: "1",
    "page-size": "100",
  });

  const response = await firefishRequest<
    FirefishContactSearchResponse | FirefishContactSearchResult[]
  >(`/api/v1.0/contacts/search/?${query.toString()}`);

  const results = extractContactResults(response);

  return (
    results.find((contact) => {
      return (
        typeof contact.EmailAddress === "string" &&
        normaliseEmail(contact.EmailAddress) === normalisedEmail
      );
    }) ?? null
  );
}