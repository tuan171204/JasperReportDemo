import React, { useEffect, useState } from "react";
import { exportList } from "../services/EmployeeService";
import { toast } from "react-toastify";

const ExportList = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    exportList()
      .then((response) => {
        // Tạo URL blob để hiển thị PDF
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setPdfUrl(fileURL);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Không thể tải báo cáo !");
      });
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "employees-report.pdf";
    link.click();
    toast.success("Đã tải xuống PDF !");
  };

  const handlePrint = () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    document.body.removeChild(iframe);
  };

  return (
    <div className="container text-center">
      <h2 className="mb-4"> Employee Report Preview</h2>

      {!pdfUrl ? (
        <p>Đang tải báo cáo...</p>
      ) : (
        <>
          {/* Xem trước file PDF */}
          <iframe
            src={pdfUrl}
            title="Employee Report"
            width="100%"
            height="600px"
            style={{ border: "1px solid #ccc", borderRadius: "10px" }}
          />

          <div className="mt-4 d-flex justify-content-center gap-3">
            <button className="btn btn-success" onClick={handleDownload}>
              Tải về
            </button>
            <button className="btn btn-primary" onClick={handlePrint}>
              In báo cáo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportList;
