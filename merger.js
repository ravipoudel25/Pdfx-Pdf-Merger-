const merger = async (p1, p2) => {
  // Dynamically import the PDFMerger class
  const { default: PDFMerger } = await import("pdf-merger-js");

  const merger = new PDFMerger();

  try {
    await merger.add(p1); // Merge all pages. Parameter is the path to the file.
    await merger.add(p2);
    let d = new Date().getTime();
    // Set metadata
    await merger.setMetadata({
      producer: "pdf-merger-js based script",
      author: "User",
      creator: "User",
      title: `${d}.pdf`,
    });
    // Save the merged PDF

    await merger.save(`./public/${d}.pdf`); // Save under given name and reset the internal document
    return d;
  } catch (err) {
    console.error("Error merging PDFs:", err);
  }
};

module.exports = { merger };
