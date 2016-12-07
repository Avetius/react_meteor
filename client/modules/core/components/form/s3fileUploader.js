import React from 'react';
import t from 'tcomb-form';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

class S3FileUploader extends t.form.Component {

  getTemplate() {
    const style = {
      minHeight: 150,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer'
    };

    const uploaderProps = {
      style,
      // max file size 2MB
      maxFileSize: 1024 * 1024 * 2,
      server: 'http://localhost:5001',
      s3Url: 'https://s3-eu-west-1.amazonaws.com/ico1/' + this.customProps.dir,
      signingUrlQueryParams: { uploadType: 'avatar', dir: this.customProps.dir }
    };

    return (locals) => {
      this.interceptedOnChange = locals.onChange;
      return (
        <div className={'form-group' + (locals.hasError ? ' has-error': '')}>
          <label className="control-label">{locals.label}</label>
          <DropzoneS3Uploader onFinish={this.interceptorOnChange.bind(this)} {...uploaderProps} />
          <div className="help-block margin-vertical-xs"><i>{this.customProps.helpText}</i></div>
        </div>
      );
    };
  };

  interceptorOnChange (val) {
    // todo put it to json config or global config object
    const icoBucketUrl = 'https://s3-eu-west-1.amazonaws.com/ico1/';
    const publicUrl = icoBucketUrl + this.customProps.dir + '/' + val.filename;
    this.interceptedOnChange(publicUrl);
  };
}

export class IcoProjectLogoUploader extends S3FileUploader  {
  constructor(props) {
    super(props);
    this.customProps = { dir: 'logo1', helpText: 'Upload main ICO project logo. Max 2MB' };
  }
}

export class CoFounderPhotoUploader extends S3FileUploader  {
  constructor(props) {
    super(props);
    this.customProps = { dir: 'teamMemberPhoto', helpText: 'Upload co-founder profile photo. Max 2MB' };
  }
}
