import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

function Create(): JSX.Element {

  let history = useHistory();

  interface IValues {
    [key: string]: any;
  }

  const [values, setValues] = useState<IValues>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      name: values.name,
    }
    const submitSuccess: boolean = await submitform(formData);
    setSubmitSuccess(submitSuccess);
    setValues({...values, formData});
    setLoading(false);
    setTimeout(() => {
      history.push('/');
    }, 1500);
  }

  const submitform = async (formData: {}) => {
    try {
      const data = new FormData(); 
      data.append('dxf', values.dxf)
      data.append('thickness', values.thickness)
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/upload/upload`, {
        method: "post",
        headers: new Headers({
          //"Content-Type": "application/json",
          //"Accept": "application/json",
        }),
        body: data
      });
      return response.ok;
    } catch (ex) {
      return false;
    }
  }
  const setFormValues = (formValues: IValues) => {
    setValues({...values, ...formValues})
  }
  const handleInputFileChanges = (e: any) => {
    e.preventDefault();
    setFormValues({ [e.currentTarget.name]: e.currentTarget.files[0] })
  }
  const handleInputChanges = (e: any) => {
    e.preventDefault();
    setFormValues({ [e.currentTarget.name]: e.currentTarget.value })
  }
  return (
    <div>
    <div className={"col-md-12 form-wrapper"}>
      <h2 className="my-4"> Create Upload </h2>

      {!submitSuccess && (
        <div className="alert alert-info" role="alert">
          Fill the form below to create a new upload.
                </div>
      )}
      {submitSuccess && (
        <div className="alert alert-info" role="alert">
          The form was successfully submitted!
                        </div>
      )}

      <form id={"create-upload-form"} onSubmit={handleFormSubmission} noValidate={true}>
        
        <div className="form-group col-md-12">
          <label htmlFor="title"> DXF file </label>
          <input type="file" id="dxf" onChange={(e) => handleInputFileChanges(e)} name="dxf" />
        </div>
        
        <div className="form-group col-md-12">
          <label htmlFor="thickness"> Thickness of steel </label>
          <input type="number" min="1" max="5" id="thickness" onChange={(e) => handleInputChanges(e)} name="thickness" />
        </div>
        
        <div className="form-group col-md-4 pull-right">
          <button className="btn btn-success" type="submit">
            Create Upload
          </button>
          {loading &&
            <span className="fa fa-circle-o-notch fa-spin" />
          }
        </div>
      </form>
    </div>
  </div>
  );

}
export default withRouter(Create)