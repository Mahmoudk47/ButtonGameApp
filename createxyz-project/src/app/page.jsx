"use client";
import React from "react";

function MainComponent() {
  const [buttons, setButtons] = useState([]);
  const [word, setWord] = useState("");
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingButton, setEditingButton] = useState(null);
  const fetchButtons = async () => {
    try {
      const response = await fetch("/api/get-buttons", { method: "POST" });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setButtons(data.buttons || []);
    } catch (err) {
      setError("Failed to load buttons");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchButtons();
  }, []);

  const totalCount = buttons.reduce((sum, button) => sum + button.number, 0);
  const handleCreateButton = async () => {
    try {
      if (buttons.some((b) => b.word.toLowerCase() === word.toLowerCase())) {
        setError("A button with this word already exists");
        return;
      }
      const response = await fetch("/api/create-button", {
        method: "POST",
        body: JSON.stringify({
          word,
          number: parseInt(number),
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const newButton = await response.json();
      setButtons([...buttons, newButton]);
      setWord("");
      setNumber(0);
      setError(null);
    } catch (err) {
      setError("Failed to create button");
      console.error(err);
    }
  };
  const handleButtonClick = async (buttonId) => {
    try {
      const response = await fetch("/api/decrement-button", {
        method: "POST",
        body: JSON.stringify({ id: buttonId }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const updatedButton = await response.json();
      setButtons(buttons.map((b) => (b.id === buttonId ? updatedButton : b)));
    } catch (err) {
      setError("Failed to update button");
      console.error(err);
    }
  };
  const startEditing = (button) => {
    setEditingButton(button);
    setWord(button.word);
    setNumber(button.number);
    setError(null);
  };
  const cancelEditing = () => {
    setEditingButton(null);
    setWord("");
    setNumber(0);
    setError(null);
  };
  const handleUpdateButton = async () => {
    try {
      if (
        buttons.some(
          (b) =>
            b.id !== editingButton.id &&
            b.word.toLowerCase() === word.toLowerCase()
        )
      ) {
        setError("A button with this word already exists");
        return;
      }
      const response = await fetch("/api/update-button-details", {
        method: "POST",
        body: JSON.stringify({
          id: editingButton.id,
          word,
          number: parseInt(number),
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const updatedButton = await response.json();
      setButtons(
        buttons.map((b) => (b.id === editingButton.id ? updatedButton : b))
      );
      cancelEditing();
    } catch (err) {
      setError("Failed to update button");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[...Array.from({ length: 24 })].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-gray-200 dark:bg-gray-800 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">
              Total Count:
            </span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalCount}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {buttons.map((button) => (
            <div
              key={button.id}
              className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <button
                onClick={() =>
                  button.number > 0 && handleButtonClick(button.id)
                }
                className={`w-full px-4 py-3 rounded-md ${
                  button.number > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700 transition-transform hover:scale-102 active:scale-98 shadow hover:shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed opacity-50"
                }`}
                disabled={button.number === 0}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base font-medium">{button.word}</span>
                  <span className="bg-white bg-opacity-20 px-2.5 py-1 rounded-full text-sm">
                    {button.number}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded">
            {error}
          </div>
        )}

        {buttons.length > 0 && (
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
            <select
              className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={editingButton?.id || ""}
              onChange={(e) => {
                const selected = buttons.find(
                  (b) => b.id === parseInt(e.target.value)
                );
                setEditingButton(selected);
                if (selected) {
                  setWord(selected.word);
                  setNumber(selected.number);
                }
              }}
            >
              <option value="">Select a button to edit</option>
              {buttons.map((button) => (
                <option key={button.id} value={button.id}>
                  {button.word} ({button.number})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            {editingButton ? "Edit Button" : "Create New Button"}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <input
              type="text"
              name="WordInput"
              className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Enter word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
            <input
              type="number"
              name="NumberInput"
              className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              min="0"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {editingButton ? (
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateButton}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Update Button
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={handleCreateButton}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Create Button
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;