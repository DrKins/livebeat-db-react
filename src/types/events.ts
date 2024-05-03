export interface LiveBeatEvent {
  $id: string;
  name: string;
  location: string;
  date: string;
  imageFileId?: string;
  imageWidth?: number;
  imageHeight?: number;
}
