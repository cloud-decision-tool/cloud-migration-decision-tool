import React from 'react';

import { redirect } from '../util/dbops';

import { Menu, Icon, Badge, Form, Button, Upload, message } from 'antd';
const FormItem = Form.Item;

import Config from '../util/config';

class UploadComp extends React.Component{

  constructor(props){
      super(props);

      this.state = {
        current: '',
        icon : props.icon ? props.icon : "inbox",
        message : props.message !== false || props.message !== undefined ? props.message : "Click or drag CSV file to this area to upload",
        filetype : props.filetype ? props.filetype : "text/csv",
        fileext : props.fileext ? props.fileext : "CSV",
        maxSize : props.maxSize ? props.maxSize : 1000000
      }
  }

  componentDidMount(){
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);

        if(this.props.onFile)
          this.props.onFile(values.dragger);
      }
    });
  }

  normFile = (e) => {
   // console.log('Upload event:', e);
   if(e.fileList.length > 1){
     message.error('Choose 1 only');
     return;
   }

   if(e.fileList[0].size > this.state.maxSize)
   {
     message.error('File Size cannot be greater than '+(this.state.maxSize/1000000)+'MB');
     return;
   }

   // console.log('fileeeee',e.file)
   // alert(e.fileList[0].type +' '+this.state.fileext)
   if(e.fileList[0].type == this.state.filetype){
     //return e && e.fileList;
     if(this.props.onFile)
       this.props.onFile(e.fileList[0]);
   }
   else {
     message.error('Choose proper '+this.state.fileext+' file');
     return;
   }
   // if (Array.isArray(e)) {
   //   message.error('Choose 1 only');
   //   return e;
   // }
   // return e && e.fileList;
 }

  render(){
    const { getFieldDecorator } = this.props.form;
      return (
          <div>

          {/* <style jsx global>{MenuCSS}</style> */}

          <Form onSubmit={this.handleSubmit}>
            <FormItem
            >
              <div className="dropbox">
                {getFieldDecorator('dragger', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  beforeUpload: false,
                  multiple: false,
                  action : false
                })(
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <Icon small type={this.state.icon} />
                    </p>
                    {this.state.message !== false &&
                      <p className="ant-upload-text">{this.state.message}</p>
                    }
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>
            {/*
            <FormItem
              wrapperCol={{ span: 12, offset: 6 }}
            >
              <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
            */}
          </Form>



          </div>
      );
  }
}

const UploadCompManage = Form.create()(UploadComp);
export default UploadCompManage;
