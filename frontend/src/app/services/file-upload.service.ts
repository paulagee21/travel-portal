import { FilePreviewModel } from 'ngx-awesome-uploader';
import { Observable, of } from 'rxjs';

export class FilePickerAdapter {

  constructor() { }

  public uploadFile(fileItem: FilePreviewModel): Observable<any> {
      return of(fileItem.file);
  }
  public removeFile(fileItem: FilePreviewModel): Observable<any> {
      return of({});
  }
}