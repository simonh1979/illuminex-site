import "server-only";

import { firefishRequest } from "./client";

export type FirefishAdvertDetails = {
  AdvertRef: number;
  AdvertTitle?: string | null;
  CompanyRef?: number | null;
  CompanyName?: string | null;
  ContactRef?: number | null;
  ContactName?: string | null;
  JobRef: number;
  JobTitle?: string | null;
  User?: string | null;
  UserEmail?: string | null;
  UserDirectDial?: string | null;
  UserPicture?: string | null;
  Discipline?: string | null;
  Role?: string | null;
  LocationArea?: string | number | null;
  SubLocation?: string | null;
  Speciality?: string | null;
  SubSpeciality?: string | null;
  Type?: string | null;
  Duration?: string | null;
  RemoteWorking?: boolean | null;
  CreatedDate?: string | null;
  UpdatedDate?: string | null;
  PostedDate?: string | null;
  ClosingDate?: string | null;
  Remuneration?: string | null;
  MinimumPayment?: number | null;
  MaximumPayment?: number | null;
  PaymentRate?: string | null;
  Currency?: string | null;
  AdvertURL?: string | null;
  ApplyUrl?: string | null;
  AdvertContent?: string | null;
};

export async function getAdvertDetails(
  advertRef: number
): Promise<FirefishAdvertDetails> {
  if (!Number.isInteger(advertRef) || advertRef <= 0) {
    throw new Error("A valid Firefish advert reference is required.");
  }

  const advert = await firefishRequest<FirefishAdvertDetails>(
    `/api/v1.0/adverts/${advertRef}`
  );

  if (!advert) {
    throw new Error("Firefish did not return the advert details.");
  }

  if (
    !Number.isInteger(advert.AdvertRef) ||
    advert.AdvertRef !== advertRef
  ) {
    throw new Error("Firefish returned an unexpected advert reference.");
  }

  return advert;
}

export async function resolveJobRefFromAdvert(
  advertRef: number
): Promise<number> {
  const advert = await getAdvertDetails(advertRef);

  if (!Number.isInteger(advert.JobRef) || advert.JobRef <= 0) {
    throw new Error(
      "This Firefish advert is not linked to a valid Firefish job."
    );
  }

  return advert.JobRef;
}