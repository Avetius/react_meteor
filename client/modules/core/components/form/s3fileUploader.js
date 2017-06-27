import React from 'react';
import t from 'tcomb-form';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

class S3FileUploader extends t.form.Component {

  constructor(props) {
    super(props);
    this.state.urlValue = 'will-be-replaced';
    this.state.originUrlBeenSet = false;
  }

  getTemplate() {
    const style = {
      minHeight: 150,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative'
    };
    const previewStyle = { ...style, border: 'solid 1px #999'};

    // todo Put it to separate function/class:
    // Meteor.absoluteUrl() eg, http://localhost:3000/ or http://test1.icoindex.com/
    const urlArr = Meteor.absoluteUrl().split(':');

    // remove possible port number
    const host = urlArr[0] + ':' + urlArr[1];

    // host: eg. http://localhost  http://test1.icoindex.com/
    const hostArr = host.split('/');

    // remove trailing slash '/' and add 5001 port
    const uploadUrl = hostArr[0] + '//' + hostArr[2] + ':5001';

    const uploaderProps = {
      style,
      // max file size 2MB
      maxFileSize: 1024 * 1024 * 2,
      server: uploadUrl,
      s3Url: 'https://s3-eu-west-1.amazonaws.com/ico1/' + this.customProps.dir,
      signingUrlQueryParams: { uploadType: 'avatar', dir: this.customProps.dir }
    };

    return (locals) => {
      // todo: fix this hack - setting state here and this way is antipattern, find more elegant solution for Tcomb's factory components
      if (!this.state.originUrlBeenSet) {
        this.state.urlValue = locals.value || '';
      }

      this.interceptedOnChange = locals.onChange;
      return (
        <div className={'form-group' + (locals.hasError ? ' has-error': '')}>
          <label className="control-label">{locals.label}</label>
          <input type="text" value={this.state.urlValue} className="form-control" disabled={locals.disabled}
                 onChange={this.rawInputTextChange.bind(this)} placeholder="Put here URL for picture or upload bellow" />
          <div style={previewStyle}>
            <img src={locals.value} className="image-uploader-preview" />
          </div>

          <DropzoneS3Uploader onFinish={this.onUploadFinishSuccess.bind(this)} {...uploaderProps} />
          <div className="help-block margin-vertical-xs">
            <i>{this.customProps.helpText} { locals.context.editMode ? <span className="h4">{' (Click twice if you want to re-upload image.)'}</span> : ''}</i>
          </div>
        </div>
      );
    };
  };

  rawInputTextChange (event) {
    this.setState({ originUrlBeenSet: true });
    this.setState({ urlValue: event.target.value });
    this.interceptedOnChange(event.target.value);
  }

  onUploadFinishSuccess (val) {
    // todo put it to json config or global config object
    const icoBucketUrl = 'https://s3-eu-west-1.amazonaws.com/ico1/';
    const publicUrl = icoBucketUrl + this.customProps.dir + '/' + val.filename;
    this.interceptedOnChange(publicUrl);
  };

}

export class IcoProjectLogoUploader extends S3FileUploader  {
  constructor(props) {
    super(props);
    this.customProps = { dir: 'logo1', helpText: '[not working now] Upload main ICO project logo here. Max 2MB.' };
  }
}

export class CoFounderPhotoUploader extends S3FileUploader  {
  constructor(props) {
    super(props);
    this.customProps = { dir: 'teamMemberPhoto', helpText: '[not working now] Upload co-founder profile photo here. Max 2MB.' };
  }
}
