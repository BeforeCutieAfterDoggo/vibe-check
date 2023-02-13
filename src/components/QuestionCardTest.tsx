import { useState } from 'react'
import Head from 'next/head'

const categories = ['Math', 'Science', 'History', 'Geography']
const questionTypes = ['Rating', 'Short Answer']

const SubmitFormPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedQuestionType, setSelectedQuestionType] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleCategoryChange = (event:any) => {
    setSelectedCategory(event.target.value)
  }

  const handleQuestionTypeChange = (event:any) => {
    setSelectedQuestionType(event.target.value)
  }

  const handleSubmit = (event:any) => {
    event.preventDefault()
    setSubmitted(true)
    // TODO: Submit the answer or question to the server
  }

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <Head>
        <title>Submit Form</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Submit Form</h1>
      {!submitted && (
        <form onSubmit={handleSubmit} className="max-w-md w-full">
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
            <select id="category" name="category" value={selectedCategory} onChange={handleCategoryChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="questionType" className="block text-gray-700 font-bold mb-2">Question Type</label>
            <select id="questionType" name="questionType" value={selectedQuestionType} onChange={handleQuestionTypeChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Select a question type</option>
              {questionTypes.map((questionType) => (
                <option key={questionType} value={questionType}>{questionType}</option>
              ))}
            </select>
          </div>
          {selectedQuestionType === 'Rating' && (
            <div className="mb-4">
              <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question</label>
              <input type="text" id="question" name="question" value={question} onChange={(event) => setQuestion(event.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          )}
          {selectedQuestionType === 'Short Answer' && (
            <div className="mb-4">
              <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question</label>
              <textarea id="question" name="question" value={question} onChange={(event) => setQuestion(event.target.value)} className ="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            )}
      </form>
        )}
        </div>
    )
}

export default SubmitFormPage
