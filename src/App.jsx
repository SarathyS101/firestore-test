import { useEffect, useState } from "react";
import "./App.css";
import db from "./utils/firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

function App() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    question: "",
    one: "",
    two: "",
    three: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "polls"), {
        question: formData.question,
        options: [formData.one, formData.two, formData.three],
        count1: 0,
        count2: 0,
        count3: 0,
      });
      setFormData({ question: "", one: "", two: "", three: "" });
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const pollSnapshot = await getDocs(collection(db, "polls"));
        const pollList = pollSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(pollList);
      } catch (err) {
        console.error("Error fetching polls:", err);
      }
    };
    fetchPolls();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          placeholder="Poll Question"
          className="border px-2 py-1"
          required
        />
        <input
          type="text"
          name="one"
          value={formData.one}
          onChange={handleChange}
          placeholder="Option 1"
          className="border px-2 py-1"
          required
        />
        <input
          type="text"
          name="two"
          value={formData.two}
          onChange={handleChange}
          placeholder="Option 2"
          className="border px-2 py-1"
          required
        />
        <input
          type="text"
          name="three"
          value={formData.three}
          onChange={handleChange}
          placeholder="Option 3"
          className="border px-2 py-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-bold">Submitted Polls:</h2>
        <ul className="mt-4 space-y-2">
          {questions.map((question, index) => (
            <li key={question.id || index} className="border p-2 rounded">
              <p className="font-semibold">{question.question}</p>
              <ul className="list-disc ml-5">
                {question.options &&
                  question.options.map((option, i) => (
                    <li key={i}>
                      {option}{" "}
                      <button
                        onClick={async () => {
                          const pollRef = doc(db, "polls", question.id); // ✅ correct doc ref
                          const field = `count${i + 1}`;
                          const current = question[field] || 0;
                          await updateDoc(pollRef, {
                            [field]: current + 1,
                          });
                        }}
                        className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                      >
                        Answer
                      </button>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
