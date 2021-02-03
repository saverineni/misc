import {
  CreateIdentityAction,
  CreateIdentityActionFailure,
  CreateIdentityActionSuccess,
  GetNationalityAction,
  GetNationalityFailure,
  GetNationalitySuccess,
} from "../action";

export interface IIdentity {
  DateOptionSelector: string;
  day?: string;
  month?: string;
  year?: string;
  fromYear?: string;
  toYear?: string;
  fullName: string;
  nationality: string;
  identityComments: string;
}

export interface IIdentityPayload {
  identity: IIdentity[];
}

export interface ICreateIdentityAction {
  payload: IIdentityPayload;
  type: string;
}

export type CreateIdentityRequestAction =
  | typeof CreateIdentityAction
  | typeof CreateIdentityActionSuccess
  | typeof CreateIdentityActionFailure;

export type GetNationalityRequestAction =
  | typeof GetNationalityAction
  | typeof GetNationalitySuccess
  | typeof GetNationalityFailure;
