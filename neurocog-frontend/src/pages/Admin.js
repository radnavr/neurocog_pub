import React, { useEffect, useState } from "react";
import { getData, sendData, editData, deleteData } from "../api";
import { MdSearch } from "react-icons/md";
import AdminRow from "../components/AdminRow";
import Button from "../components/Button";
import Error from "../components/Error";
import Checkbox from "../components/Checkbox";
import InputField from "../components/InputField";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

const Admin = () => {
  /* MAKING AUTOMATIC GET CALL */
  const [data, setData] = useState([]);
  const [fetchCalls, setFetchCalls] = useState(1);
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
  }, [fetchCalls]);

  /* FORM LOGIC */

  // FORM VALIDITY
  const [formValidity, setFormValidity] = useState(true);

  // FORM VALUES
  const [jmeno, setJmeno] = useState("");
  const handleJmenoChange = (e) => setJmeno(e.target.value);

  const [umisteni, setUmisteni] = useState("");
  const handleUmisteniChange = (e) => setUmisteni(e.target.value);

  const [minVek, setMinVek] = useState("");
  const handleMinVekChange = (e) => setMinVek(e.target.value);

  const [maxVek, setMaxVek] = useState("");
  const handleMaxVekChange = (e) => setMaxVek(e.target.value);

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

  // MAKING POST CALL & PUT CALL 3/3
  const handleSubmit = async (e) => {
    e.preventDefault();

    // creating zaber string & zaber validation resource
    const zaberResource = [];
    if (exekutiva.value) zaberResource.push(exekutiva.name);
    if (konstrukce.value) zaberResource.push(konstrukce.name);
    if (matematika.value) zaberResource.push(matematika.name);
    if (motorika.value) zaberResource.push(motorika.name);
    if (mysleni.value) zaberResource.push(mysleni.name);
    if (pamet.value) zaberResource.push(pamet.name);
    if (pozornost.value) zaberResource.push(pozornost.name);
    if (rec.value) zaberResource.push(rec.name);
    if (vizuoprostor.value) zaberResource.push(vizuoprostor.name);
    const zaber = zaberResource.toString().replaceAll(",", ", ");

    // making first letter capital FX
    const firstLetterCapital = (string) => {
      return string.charAt(0).toLocaleUpperCase() + string.slice(1);
    };

    // assigning id FX
    const appropriateId = () => {
      let ids = [];
      for (let item of data) {
        ids.push(item.id);
      }
      let sequenceOfIds = ids.sort((a, b) => {
        return a - b;
      });
      for (let i = 1; i < sequenceOfIds.length + 1; i++) {
        if (i !== sequenceOfIds[i - 1]) {
          return i;
        }
      }
      return sequenceOfIds.length + 1;
    };

    // creating item to compile
    const itemToCompile = {
      jmeno: firstLetterCapital(jmeno),
      id: appropriateId(),
      zaber: zaber,
      umisteni: umisteni.toLocaleUpperCase(),
      minVek: minVek,
      maxVek: maxVek,
      exekutiva: exekutiva.value,
      konstrukce: konstrukce.value,
      matematika: matematika.value,
      motorika: motorika.value,
      mysleni: mysleni.value,
      pamet: pamet.value,
      pozornost: pozornost.value,
      rec: rec.value,
      vizuoprostor: vizuoprostor.value,
    };

    // input validation
    if (itemToCompile.maxVek < itemToCompile.minVek) {
      setFormValidity(false);
      return;
    }
    if (zaberResource.length === 0) {
      setFormValidity(false);
      return;
    }
    if (!formValidity) {
      setFormValidity(true);
    }

    // calling appropriate fetch (editing item to compile resp.)
    if (actionDesignation === "PUT") {
      itemToCompile._id = itemDesignation._id;
      itemToCompile.id = itemDesignation.id;
      await editData(itemToCompile);
      setActionDesignation(null);
      setItemDesignation({ ...itemDesignation, _id: null, id: null });
    } else {
      await sendData(itemToCompile);
    }

    // putting UI to default
    setJmeno("");
    setUmisteni("");
    setMinVek("");
    setMaxVek("");
    setExekutiva({ ...exekutiva, value: false });
    setKonstrukce({ ...konstrukce, value: false });
    setMatematika({ ...matematika, value: false });
    setMotorika({ ...motorika, value: false });
    setMysleni({ ...mysleni, value: false });
    setPamet({ ...pamet, value: false });
    setPozornost({ ...pozornost, value: false });
    setRec({ ...rec, value: false });
    setVizuoprostor({ ...vizuoprostor, value: false });
    setRowActionLayout(null);

    //initialize new fetch call
    setFetchCalls(fetchCalls + 1);
  };

  /* INVENTORY  LOGIC */

  // PHRASE TO SEARCH
  const [searchPhrase, setSearchPhrase] = useState("");
  const handleSearch = (e) => setSearchPhrase(e.target.value);

  // ID TO SEARCH
  const [searchId, setsearchId] = useState("");
  const handleIdSearch = (e) => setsearchId(e.target.value);

  // PAGE & ITEMS PER PAGE
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(4);

  // FILTERING & SORTING ITEMS
  let includingSearchPhrase = data
    .filter((item) => item.jmeno.toLowerCase().includes(searchPhrase))
    .filter((item) => item.id.toString().includes(searchId))
    .reverse();

  // PAGINATION
  let indexOfLastResult = currentPage * resultsPerPage;
  let indexOfFirstResult = indexOfLastResult - resultsPerPage;
  let currentResults = includingSearchPhrase.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  const paginate = (newPage) => setCurrentPage(newPage);

  // ACTION MENU 1/X
  const [rowActionLayout, setRowActionLayout] = useState(null);

  // ACTION MENU 2/X
  const [actionDesignation, setActionDesignation] = useState(null);

  // OUTSIDE OF FORM VALUES
  const [itemDesignation, setItemDesignation] = useState({
    _id: null,
    id: null,
  });

  // MAKING PUT CALL 1/3
  const handleEditClick = (e, item) => {
    e.preventDefault();
    setActionDesignation("PUT");
    setRowActionLayout(item._id);
  };

  // MAKING PUT CALL 2/3
  const handleEditConfirm = (e, item) => {
    e.preventDefault();

    // setting form to edited item values
    setJmeno(item.jmeno);
    setUmisteni(item.umisteni);
    setMinVek(item.minVek);
    setMaxVek(item.maxVek);
    setExekutiva({ ...exekutiva, value: item.exekutiva });
    setKonstrukce({ ...konstrukce, value: item.konstrukce });
    setMatematika({ ...matematika, value: item.matematika });
    setMotorika({ ...motorika, value: item.motorika });
    setMysleni({ ...mysleni, value: item.mysleni });
    setPamet({ ...pamet, value: item.pamet });
    setPozornost({ ...pozornost, value: item.pozornost });
    setRec({ ...rec, value: item.rec });
    setVizuoprostor({ ...vizuoprostor, value: item.vizuoprostor });

    // saving outside of form values
    setItemDesignation({ ...itemDesignation, _id: item._id, id: item.id });
  };

  // MAKING DELETE CALL 1/2
  const handleDeleteClick = (e, item) => {
    e.preventDefault();
    setActionDesignation("DELETE");
    setRowActionLayout(item._id);
  };

  // MAKING DELETE CALL 2/2
  const handleDeleteConfirm = async (e, item) => {
    e.preventDefault();
    await deleteData(item._id);
    setActionDesignation(null);
    setRowActionLayout(null);
    setFetchCalls(fetchCalls + 1);
  };

  // CANCELING CALLS 1/X
  const handleCancel = () => {
    setActionDesignation(null);
    setRowActionLayout(null);
  };

  if (reqStatus.pending) {
    return <Spinner />;
  }

  if (reqStatus.rejected) {
    return <Error />;
  }

  return (
    <div className="flex-row x-centered y-centered growing min-w-1200-px">
      <div className="growing margin-1rem">
        <form
          className="margin-0-0-1rem"
          onSubmit={handleSubmit}
          id="adminForm"
        >
          <div
            className={
              formValidity
                ? "flex-row x-centered y-centered h-40-px bg-green A-green-border"
                : "flex-row x-centered y-centered h-40-px bg-red A-green-red"
            }
          >
            <span className="heading-text">
              {formValidity
                ? "ZAVEDENÍ NOVÉ METODY"
                : "ZADÁNY NEADEKVÁTNÍ PARAMETRY METODY"}
            </span>
          </div>
          <div className="flex-row y-centered h-42-px side-borders">
            <InputField
              componentStyle="w-100-per margin-0-15px"
              inputStyle="common-input basic-text text-align-center w-100-per"
              inputType="text"
              placeholder="jméno"
              onChange={handleJmenoChange}
              value={jmeno}
            />
          </div>
          <div className="flex-row x-betweened y-centered h-42-px side-borders">
            <InputField
              inputStyle="common-input basic-text text-align-center w-160-px margin-0-15px"
              inputType="text"
              placeholder="umístění"
              onChange={handleUmisteniChange}
              value={umisteni}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="exekutiva"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleExekutivaChange}
              value={exekutiva.value}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="konstrukce"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleKonstrukceChange}
              value={konstrukce.value}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="matematika"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleMatematikaChange}
              value={matematika.value}
            />
          </div>
          <div className="flex-row x-betweened y-centered h-42-px side-borders">
            <InputField
              inputStyle="common-input basic-text text-align-center w-160-px margin-0-15px"
              inputType="text"
              placeholder="min. věk"
              onChange={handleMinVekChange}
              value={minVek}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="motorika"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleMotorikaChange}
              value={motorika.value}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="myšlení"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleMysleniChange}
              value={mysleni.value}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="paměť"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handlePametChange}
              value={pamet.value}
            />
          </div>
          <div className="flex-row x-betweened y-centered h-42-px side-borders">
            <InputField
              inputStyle="common-input basic-text text-align-center w-160-px margin-0-15px"
              inputType="text"
              placeholder="max. věk"
              onChange={handleMaxVekChange}
              value={maxVek}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="pozornost"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handlePozornostChange}
              value={pozornost.value}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="řeč"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleRecChange}
              value={rec.value}
            />
            <Checkbox
              componentStyle="flex-row x-betweened w-160-px margin-0-15px"
              inputName="vizuoprostor"
              inputStyle="checkbox"
              labelStyle="basic-text"
              onChange={handleVizuoprostorChange}
              value={vizuoprostor.value}
            />
          </div>
          <div className="flex-row x-centered y-centered bg-light-gray U-gray-border h-42-px">
            <Button
              btnType="submit"
              btnDesignation="btn primary w-120-px"
              btnName="ULOŽIT"
            />
          </div>
        </form>

        <div className="flex-column h-256-px w-100-per">
          <table className="w-100-per border-spacing-0">
            <thead className="bg-green h-44-px w-100-per">
              <tr>
                <th className="align-left heading-text w-30-per">
                  <div className="flex-row y-centered">
                    <MdSearch className="icon" />
                    <InputField
                      inputStyle="invisible-input basic-text"
                      inputType="text"
                      placeholder="JMÉNO"
                      onChange={handleSearch}
                    />
                  </div>
                </th>
                <th className="heading-text align-left w-30-per">
                  <span className="indented">OBLASTI</span>
                </th>
                <th className="heading-text w-5-per">VĚK</th>
                <th className="heading-text w-10-per">UMÍSTĚNÍ</th>
                <th className="heading-text w-5-per">
                  <div className="flex-row x-centered y-centered">
                    <MdSearch className="icon" />
                    <InputField
                      inputStyle="invisible-input basic-text w-25-px"
                      inputType="text"
                      onChange={handleIdSearch}
                      placeholder="ID"
                    />
                  </div>
                </th>
                <th className="heading-text w-20-per">AKCE</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((item) => (
                <AdminRow
                  actionDesignation={actionDesignation}
                  handleCancel={handleCancel}
                  handleDeleteClick={handleDeleteClick}
                  handleDeleteConfirm={handleDeleteConfirm}
                  handleEditClick={handleEditClick}
                  handleEditConfirm={handleEditConfirm}
                  item={item}
                  key={item._id}
                  rowActionLayout={rowActionLayout}
                />
              ))}
            </tbody>
          </table>
          <div className="expander side-borders"></div>
          <div className="flex-row x-centered y-centered bg-light-gray U-gray-border h-42-px">
            <Pagination
              currentPage={currentPage}
              onClick={paginate}
              resultsPerPage={resultsPerPage}
              totalResults={includingSearchPhrase.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
