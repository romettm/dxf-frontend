// blog-frontend/src/components/upload/Upload.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

function Upload() {
  let { uploadId } = useParams<{ uploadId: string }>();
  const [upload, setUpload] = useState<any>({});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/upload/upload/${uploadId}`);
      const json = await response.json();
      setUpload(json);
    }
    fetchData();
  }, [uploadId]);

    return (
        <section className="upload-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-0" />
            <div className="col-lg-10 col-md-12">
              {upload && 
                <div className="main-upload">
                  <div className="upload-top-area">
                    <h5 className="pre-title">Nest React Blog</h5>
                    <h3 className="title">
                      <span>
                        <b>{upload.name}</b>
                      </span>
                    </h3>
                    <p className="para">
                      {upload.name}
                    </p>
                  </div>
                </div>              
              }
            </div>
          </div>
        </div>
      </section>
    );
}
export default Upload;