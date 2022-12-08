import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [experienceInput, setExperienceInput] = useState("");
  const [productnameInput, setProductnameInput] = useState("");
  const [vendornameInput, setVendornameInput] = useState("");
  const [languageInput, setLanguageInput] = useState("English");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ experience: experienceInput, productName: productnameInput, vendorName: vendornameInput, language:languageInput }),
    });
    const data = await response.json();
    setResult(data.result);
    // setExperienceInput("");
    // setProductnameInput("");
    // setVendornameInput("");
  }

  return (
    <div>
      <Head>
        <title>Coeus Solutions Review Text Generator</title>
        <link rel="icon" href="/coeus-solutions.png" />
      </Head>

      <main className={styles.main}>
        <h3>Enter your shopping experience, product name and vendor name</h3>
        <h5>Excellent, Very Good, Good, Bad, worst</h5>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="experience"
            placeholder="Enter your experience"
            value={experienceInput}
            onChange={(e) => setExperienceInput(e.target.value)}
          />

          <input
            type="text"
            name="productName"
            placeholder="Enter your Product name"
            value={productnameInput}
            onChange={(e) => setProductnameInput(e.target.value)}
          />

          <input
            type="text"
            name="vendorName"
            placeholder="Enter your vendor name"
            value={vendornameInput}
            onChange={(e) => setVendornameInput(e.target.value)}
          />
          <input
            type="text"
            name="language"
            placeholder="Enter your preffered language"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
          />
          <input type="submit" value="Generate review text" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
