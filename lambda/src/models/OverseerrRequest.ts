interface OverseerrRequest {
  id: number;
  status: number;
  media: MediaInfo;
  createdAt: string;
  updatedAt: string;
  requestedBy: OverseerrUser;
  modifiedBy: OverseerrUser;
  is4k: boolean;
  serverId: number;
  profileId: number;
  rootFolder: string;
}
