"use client";
import React from "react";

function MainComponent() {
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const [word, setWord] = useState("");
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleButtonClick = async (id) => {
    try {
      const response = await fetch("/api/decrement-button", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const updatedButton = await response.json();
      if (updatedButton) {
        setButtons(buttons.map((b) => (b.id === id ? updatedButton : b)));
      }
    } catch (err) {
      setError("Failed to update button");
      console.error(err);
    }
  };

  const handleUpdateButton = async () => {
    if (!selectedButton) return;
    try {
      const response = await fetch("/api/update-button", {
        method: "POST",
        body: JSON.stringify({
          id: selectedButton,
          word,
          number: parseInt(number),
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const updatedButton = await response.json();
      if (updatedButton) {
        setButtons(
          buttons.map((b) => (b.id === selectedButton ? updatedButton : b))
        );
      }
    } catch (err) {
      setError("Failed to save changes");
      console.error(err);
    }
  };

  const totalSum = buttons.reduce(
    (sum, button) => sum + (button.number || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[...Array.from({ length: 40 })].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 dark:bg-gray-800 rounded"
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
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <select
            className="p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={selectedButton || ""}
            onChange={(e) => {
              const button = buttons.find(
                (b) => b.id === parseInt(e.target.value)
              );
              setSelectedButton(parseInt(e.target.value));
              setWord(button ? button.word : "");
              setNumber(button ? button.number : 0);
            }}
          >
            <option value="">Select a button</option>
            {buttons.map((button) => (
              <option key={button.id} value={button.id}>
                Button {button.id}
              </option>
            ))}
          </select>
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
          <button
            onClick={handleUpdateButton}
            className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            disabled={!selectedButton}
          >
            Update
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded">
            {error}
          </div>
        )}

        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Total Sum: {totalSum}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {buttons.map((button) => (
            <button
              key={button.id}
              onClick={() => button.number > 0 && handleButtonClick(button.id)}
              className={`p-4 rounded border text-center transition-all ${
                button.number > 0
                  ? "border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 cursor-not-allowed"
              }`}
              disabled={button.number === 0}
            >
              <div
                className={`text-sm ${
                  button.number > 0
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {button.word}: {button.number}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;