export enum OpponentFindingStatus {
  FINDING = 'FINDING',
  ACCEPTED = 'ACCEPTED',
  CANCELLED = 'CANCELLED',
  OPPONENT_CANCELLED = 'OPPONENT_CANCELLED',
  OVERLAPPED_CANCELLED = 'OVERLAPPED_CANCELLED'
}

export enum OpponentFindingRequestStatus {
  CANCELLED = 'CANCELLED',
  SELF_CANCELLED = 'SELF_CANCELLED',
  OVERLAPPED_CANCELLED = 'OVERLAPPED_CANCELLED'
}

export const postMaxLength = 500
