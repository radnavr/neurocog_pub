import React, { useEffect, useState } from "react";
import { getData } from "../api";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Error from "../components/Error";
import InputField from "../components/InputField";
import Pagination from "../components/Pagination";
import ResultCard from "../components/ResultCard";
import ResultsInfo from "../components/ResultsInfo";
import Spinner from "../components/Spinner";

const Form = () => {
  // MAKING AUTOMATIC GET CALL

  const [reqStatus, setReqStatus] = useState({
    pending: false,
    fulfilled: false,
    rejected: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setReqStatus({ pending: true, fulfilled: false, rejected: false });

      const responseJson = await getData();

      if (responseJson) {
        setReqStatus({ pending: false, fulfilled: true, rejected: false });
      } else {
        setReqStatus({ pending: false, fulfilled: false, rejected: true });
      }

      setData(responseJson);
    };

    fetchData();
  }, []);

  /* FORM LOGIC */

  // FORM VALUES
  const [data, setData] = useState([]);

  const [vek, setVek] = useState("");
  const handleVekChange = (e) => setVek(e.target.value);

  const [exekutiva, setExekutiva] = useState({
    name: "exekutiva",
    value: false,
  });
  const handleExekutivaChange = () =>
    setExekutiva({ ...exekutiva, value: !exekutiva.value });

  const [konstrukce, setKonstrukce] = useState({
    name: "konstrukce",
    value: false,
  });
  const handleKonstrukceChange = () =>
    setKonstrukce({ ...konstrukce, value: !konstrukce.value });

  const [matematika, setMatematika] = useState({
    name: "matematika",
    value: false,
  });
  const handleMatematikaChange = () =>
    setMatematika({ ...matematika, value: !matematika.value });

  const [motorika, setMotorika] = useState({ name: "motorika", value: false });
  const handleMotorikaChange = () =>
    setMotorika({ ...motorika, value: !motorika.value });

  const [mysleni, setMysleni] = useState({ name: "myšlení", value: false });
  const handleMysleniChange = () =>
    setMysleni({ ...mysleni, value: !mysleni.value });

  const [pamet, setPamet] = useState({ name: "paměť", value: false });
  const handlePametChange = () => setPamet({ ...pamet, value: !pamet.value });

  const [pozornost, setPozornost] = useState({
    name: "pozornost",
    value: false,
  });
  const handlePozornostChange = () =>
    setPozornost({ ...pozornost, value: !pozornost.value });

  const [rec, setRec] = useState({ name: "řeč", value: false });
  const handleRecChange = () => setRec({ ...rec, value: !rec.value });

  const [vizuoprostor, setVizuoprostor] = useState({
    name: "vizuoprostor",
    value: false,
  });
  const handleVizuoprostorChange = () =>
    setVizuoprostor({ ...vizuoprostor, value: !vizuoprostor.value });

  // SUM OF ALL FILTERED RESULTS
  const [proceduresToUse, setProceduresToUse] = useState([]);

  // DESIGNATES PRIMARY AND SECONDARY ACTION
  const [actionDesignation, setActionDesignation] = useState(true);

  /* RESULTS */

  // PAGE & ITEMS PER PAGE
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);

  // PAGINATION OF RESULTS <proceduresToUse -> currentResults>
  let indexOfLastResult = currentPage * resultsPerPage;
  let indexOfFirstResult = indexOfLastResult - resultsPerPage;
  let currentResults = proceduresToUse.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const paginate = (newPage) => setCurrentPage(newPage);

  // ACQUIRES RESULTS OF FORM REQUEST
  const handleSubmit = (e) => {
    e.preventDefault();
    setProceduresToUse(getResults());
    setActionDesignation(false);
  };

  const getResults = () => {
    const features = [
      exekutiva,
      konstrukce,
      matematika,
      motorika,
      mysleni,
      pamet,
      pozornost,
      rec,
      vizuoprostor,
    ];

    // determining items with appropriate age designation
    const isOfAge = data
      .filter((item) => item.minVek <= vek)
      .filter((item) => item.maxVek >= vek);

    let isChecked = [];
    let results = [];

    // determining form request
    for (let feature of features) {
      if (feature.value) {
        isChecked.push(
          feature.name.normalize("NFD").replace(/\p{Diacritic}/gu, "")
        );
      }
    }

    // inspecting individual items
    for (let item of isOfAge) {
      // sum of item's feature of true
      let isTrue = [];

      // identyfies intersection between form request and sum of item's features of true
      const corresponds = (trues, checked) =>
        checked.every((element) => trues.includes(element));

      // identyfying item's key values of true
      for (let key in item) {
        if (item[key] === true) {
          isTrue.push(key);
        }
      }

      // filtering items of features matching the request
      if (corresponds(isTrue, isChecked)) {
        results.push(item);
      }
    }

    return results;
  };

  // PUTTING UI TO DEFAULT
  const handleReset = () => {
    setExekutiva({ ...exekutiva, value: false });
    setKonstrukce({ ...konstrukce, value: false });
    setMatematika({ ...matematika, value: false });
    setMotorika({ ...motorika, value: false });
    setMysleni({ ...mysleni, value: false });
    setPamet({ ...pamet, value: false });
    setPozornost({ ...pozornost, value: false });
    setRec({ ...rec, value: false });
    setVizuoprostor({ ...vizuoprostor, value: false });
    setActionDesignation(true);
    setProceduresToUse([]);
    setCurrentPage(1);
  };

  if (reqStatus.pending) {
    return <Spinner />;
  }

  if (reqStatus.rejected) {
    return <Error />;
  }

  return (
    <div className="flex-row y-centered growing min-w-1200-px">
      <div className="flex-row x-evened w-100-per">
        <form
          onSubmit={handleSubmit}
          className="flex-column w-300-px margin-1rem"
          id="userForm"
        >
          <div className="flex-row x-centered y-centered h-40-px bg-green A-green-border">
            <span className="heading-text">PARAMETRY VYHLEDÁVÁNÍ</span>
          </div>
          <div className="h-400-px padding-10px-0 side-borders">
            <InputField
              componentStyle={
                "flex-row x-centered y-centered h-40-px margin-0-15px"
              }
              inputStyle={"common-input basic-text text-align-center w-100-per"}
              inputType={"text"}
              onChange={handleVekChange}
              placeholder="mentální věk dítěte"
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={exekutiva.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleExekutivaChange}
              value={exekutiva.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={konstrukce.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleKonstrukceChange}
              value={konstrukce.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={matematika.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleMatematikaChange}
              value={matematika.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={motorika.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleMotorikaChange}
              value={motorika.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={mysleni.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleMysleniChange}
              value={mysleni.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={pamet.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handlePametChange}
              value={pamet.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={pozornost.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handlePozornostChange}
              value={pozornost.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={rec.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleRecChange}
              value={rec.value}
            />
            <Checkbox
              componentStyle={
                "flex-row h-40-px x-betweened y-centered margin-0-15px"
              }
              inputName={vizuoprostor.name}
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleVizuoprostorChange}
              value={vizuoprostor.value}
            />
          </div>
          <div className="flex-row x-betweened y-centered bg-light-gray U-gray-border h-42-px">
            <Button
              btnType={"submit"}
              btnName="HLEDAT"
              btnDesignation={
                actionDesignation
                  ? "btn primary w-120-px margin-0-15px"
                  : "btn secondary w-120-px margin-0-15px"
              }
            />
            <Button
              btnType={"reset"}
              btnName="RESET"
              onClick={handleReset}
              btnDesignation={
                actionDesignation
                  ? "btn secondary w-120-px margin-0-15px"
                  : "btn primary w-120-px margin-0-15px"
              }
            />
          </div>
        </form>
        <div className="flex-column w-600-px margin-1rem">
          <div className="flex-row x-centered y-centered h-40-px bg-green A-green-border">
            <span className="heading-text">VÝSLEDKY VYHLEDÁVÁNÍ</span>
          </div>
          <div className="h-400-px padding-10px-0 side-borders">
            {proceduresToUse.length > 0 ? (
              currentResults.map((item) => (
                <ResultCard
                  key={item.id}
                  name={item.jmeno}
                  placing={item.umisteni}
                  desc={item.zaber}
                />
              ))
            ) : actionDesignation ? (
              <ResultsInfo infoLineOne="Zadejte parametry vyhledávání..." />
            ) : (
              <ResultsInfo
                infoLineOne="Výsledky odpovídající zadání nenalezeny..."
                infoLineTwo="Tip: Zadejte méně parametrů"
              />
            )}
          </div>
          <div className="flex-row x-centered y-centered bg-light-gray U-gray-border h-42-px">
            <Pagination
              currentPage={currentPage}
              resultsPerPage={resultsPerPage}
              totalResults={proceduresToUse.length}
              onClick={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
