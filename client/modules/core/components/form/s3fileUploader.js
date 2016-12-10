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
    // Meteor.absoluteUrl() is like http://localhost:3000/ or https://icoindex.com
    const urlArr = Meteor.absoluteUrl().split(':');
    // remove possible port number and add 5001 port
    const uploadUrl = `${urlArr[0]}:${urlArr[1]}:5001`;

    const uploaderProps = {
      style,
      // max file size 2MB
      maxFileSize: 1024 * 1024 * 2,
      server: uploadUrl,
      s3Url: 'https://s3-eu-west-1.amazonaws.com/ico1/' + this.customProps.dir,
      signingUrlQueryParams: { uploadType: 'avatar', dir: this.customProps.dir }
    };

    return (locals) => {
      this.interceptedOnChange = locals.onChange;
      return (
        <div className={'form-group' + (locals.hasError ? ' has-error': '')}>
          <label className="control-label">{locals.label}</label>
          {
            locals.context.editMode && !this.state.enableReUpload ? (
              <div style={style} onClick={this.enableReUpload.bind(this)}>
                <img src={locals.value} className="image-uploader-preview" />
              </div> ) : (
                <DropzoneS3Uploader onFinish={this.interceptorOnChange.bind(this)} {...uploaderProps} />
              )
          }
          <div className="help-block margin-vertical-xs">
            <i>{this.customProps.helpText} { locals.context.editMode ? <span className="h4">{' (Click twice if you want to re-upload image.)'}</span> : ''}</i>
          </div>
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

  enableReUpload () {
    this.setState({enableReUpload: true});
    // force form component to call getTemplate() ie. re-render our content
    this.interceptedOnChange('');
  }

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
