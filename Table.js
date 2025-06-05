import React, { Fragment } from "react";

const Table = (props) => {
  const { applications } = props;
  return (
    <div>
      <h1 className="text-primary" style={{ textAlign: "center" }}>
        List of Applications
      </h1>
      <table className="table table-bordered">
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Id</th>
            <th>Application Id</th>
            <th>Applicant Name</th>
            <th>Application Type</th>
            <th>Applied On</th>
            <th>Completed Date</th>
            <th>District Name</th>
            <th>ULB</th>
            <th>Locality</th>
            <th>Survey No</th>
            <th>Plot No</th>
            <th>Documents</th>
            {/* <th>Certificates</th> */}
          </tr>
        </thead>
        <tbody>
          {applications?.map((each, index) => (
            <tr key={index}>
              <td>{each.id}</td>
              <td>{each.application_id}</td>
              <td>{each.applicant_name}</td>
              <td>{each.application_type}</td>
              <td>{each.applied_on}</td>
              <td>{each.completed_date}</td>
              <td>{each.district_name}</td>
              <td>{each.ulb}</td>
              <td>{each.locality}</td>
              <td>{each.survey_no}</td>
              <td>{each.plot_no}</td>
              <td>
                <ol>
                  {each.documents?.map((eachDoc, index) => (
                    <Fragment key={index}>
                      <li>
                        <a href={eachDoc} target="blank">
                          Docs
                        </a>{" "}
                        <br />
                      </li>
                    </Fragment>
                  ))}
                </ol>
              </td>

              {/* <td>
                {each.certificates.Acknowledgement}
                <br />
                {each.certificates.WorkCommencement}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
