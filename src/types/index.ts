export interface CurrentReportProps {
  requests: number;
  success: number;
  failed: number;
  status: boolean;
}

export enum ActionsTypes {
  addRequest = "addRequest",
  addSuccess = "addSuccess",
  addFailed = "addFailed",
  changeStatus = "changeStatus",
  initialState = "initialState",
}

export interface ActionsProps {
  type:
    | ActionsTypes.addFailed
    | ActionsTypes.addRequest
    | ActionsTypes.addSuccess
    | ActionsTypes.changeStatus
    | ActionsTypes.initialState;
}
