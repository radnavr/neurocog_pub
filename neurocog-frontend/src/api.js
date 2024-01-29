const NEUROCOG_API_URL = process.env.REACT_APP_API_URL;

// GET
export const getData = async () => {
  try {
    const response = await fetch(NEUROCOG_API_URL);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    console.error(error);
  }
};

// POST
export const sendData = async (newItem) => {
  try {
    await fetch(NEUROCOG_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });
  } catch (error) {
    console.error(error);
  }
};

// PUT
export const editData = async (editedItem) => {
  try {
    await fetch(`${NEUROCOG_API_URL}/${editedItem._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedItem),
    });
  } catch (error) {
    console.error(error);
  }
};

// DELETE
export const deleteData = async (itemOfId) => {
  try {
    await fetch(`${NEUROCOG_API_URL}/${itemOfId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
};
