import React, { useState, useEffect } from 'react';



function Home():JSX.Element {


  const [uploads, setUploads] = useState<any>();

  useEffect(() => {
    const fetchUploads = async (): Promise<any> => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/upload/uploads`);
      let json = await response.json();


      //svg path
      
      json.forEach(function(r:any, index:any, a1:any) {
        if(!r.fi.width) return true;
        var d = '';
        var min_x = 0;
        var min_y = 0;
        var max_x = 0;
        var max_y = 0;
        //console.log(r);
        r.fi.holes.forEach(function(holeset:any, holesetindex:any, a2:any) {
          holeset.forEach(function(h:any, holeindex:any, a3:any) {
            let mode = holeindex === 0 ? 'M' : 'L';
            d += mode+' '+h[0]+' '+h[1]+' ';
            min_x = Math.min(min_x, h[0]);
            min_y = Math.min(min_y, h[1]);
            max_x = Math.max(max_x, h[0]);
            max_y = Math.max(max_y, h[1]);
          });
        });
        
        r.fi.outline.forEach(function(l:any, olindex:any, a4:any) {
          let mode = olindex === 0 ? 'M' : 'L';
          d += mode+' '+l[0]+' '+l[1]+' ';  
          min_x = Math.min(min_x, l[0]);
          min_y = Math.min(min_y, l[1]);
          max_x = Math.max(max_x, l[0]);
          max_y = Math.max(max_y, l[1]);        
        });
        //console.log(d);
        //d = "M 10 10 L 30 30";
        json[index].message = '';
        json[index].thumbnail = d;
        json[index].viewbox = (min_x-25)+' '+(min_y-25)+' '+(max_x-min_x+50)+' '+(max_y-min_y+50);
        //console.log(json[index].viewbox)
      });
      
      setUploads(json);
      //console.log(json)
    }
    fetchUploads();
  }, [])

  return (
      <section className="upload-area section">
      <div className="container">
        <div className="row">
          {uploads && uploads.map((upload: {_id: string, name: string, fi: any, thickness: number, date_created: string, thumbnail: string, viewbox: string, message: string}) => (
            <div className="col-lg-4 col-md-6" key={upload._id}>
            <div className="card h-100">
              <div className="single-upload upload-style-1">
                <div className="upload-image d-flex">
                  <svg className="m-auto" width="100%" height="100%" viewBox={upload.viewbox} xmlns="http://www.w3.org/2000/svg">
                    <path fill="#ffff00" stroke="#000000" strokeWidth="1" fillRule="evenodd" d={upload.thumbnail} />
                  </svg>
                </div>
                
                <div className="upload-info">
                  <h4 className="title">
                    <span>
                      <b>{upload.name}</b>
                    </span>
                  </h4>
                  {
                  upload.fi.width ? 
                  <ul className="list-group mx-4 text-left">                   
                    <li className="list-group-item">Dimensions {upload.fi.width.toFixed(2)} x {upload.fi.height.toFixed(2)}</li>
                    <li className="list-group-item">Weight {Number(upload.thickness * upload.fi.totalArea * 7.85 / 100).toFixed(2)} g</li>
                    <li className="list-group-item">Thickness {upload.thickness} mm</li>
                    <li className="list-group-item">Line length {upload.fi.lineLengths.reduce(function(acc:any, val:any) { return acc + val; }, 0).toFixed(2)} mm</li>
                    <li className="list-group-item">Submitted {upload.date_created}</li>
                  </ul> : 
                  <div className="alert alert-danger mx-4">{upload.fi.message}</div>
                }
                </div>
              </div>
              
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Home;