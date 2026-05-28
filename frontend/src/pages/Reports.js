import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [report, setReport] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports/summary")
      .then((res) => {
        setReport(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Reports Dashboard</h2>

      <div className="card p-3 mt-3">
        <h4>Total Students: {report.totalStudents}</h4>
        <h4>Total Teachers: {report.totalTeachers}</h4>
      </div>
    </div>
  );
};

export default Reports;