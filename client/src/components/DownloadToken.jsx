import jsPDF from "jspdf";

const DownloadToken = () => {

  const generatePDF = () => {

    const pdf =
      new jsPDF();

    pdf.text(
      "QueueCare Clinic",
      20,
      20
    );

    pdf.text(
      "Token Number: 106",
      20,
      40
    );

    pdf.text(
      "Patient: Rahul",
      20,
      60
    );

    pdf.save(
      "QueueCareToken.pdf"
    );
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-blue-600 text-white px-5 py-3 rounded-xl"
    >
      Download Token
    </button>
  );
};

export default DownloadToken;