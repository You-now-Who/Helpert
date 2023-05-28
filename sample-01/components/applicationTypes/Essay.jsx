import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function Essay({ id, work, setWork }) {
  const [text, setText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleTextChange = (value) => {
    setText(value);
    setWork((prevWork) => ({
      ...prevWork,
      [id]: { text: value, prompt, completed, type: "essay" },
    }));
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
    setWork((prevWork) => ({
      ...prevWork,
      [id]: { text, prompt: event.target.value, completed, type: "essay"  },
    }));
  };

  const handleCheckboxChange = (event) => {
    setCompleted(event.target.checked);
    setWork((prevWork) => ({
      ...prevWork,
      [id]: { text, prompt, completed: event.target.checked, type: "essay"  },
    }));
  };

  return (
    <>
      {/* Add the prompt */}
      <div className="flex-col">
        <div className="flex row justify-between items-center mt-2 my-3">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <label htmlFor="prompt" className="text-gray-500 mx-2">
                Prompt:{' '}
              </label>
              <input
                type="text"
                id="prompt"
                value={prompt}
                onChange={handlePromptChange}
                className="mr-2"
              />
            </div>
          </div>
        </div>

        <div className="row my-6">
          {/* Add the Quill editor */}
          <QuillNoSSRWrapper
            theme="snow"
            value={text}
            onChange={handleTextChange}
            className="w-96 h-40"
            uid={id}
          />
          <div className="flex justify-between items-center mt-20">
            <div className="flex items-center">
              <div className="flex items-center mr-2">
                <input
                  type="checkbox"
                  id={`completed-${id}`}
                  checked={completed}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label
                  htmlFor={`completed-${id}`}
                  className="text-gray-500"
                >
                  Completed
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}