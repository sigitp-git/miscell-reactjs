import React, { useState } from 'react'
import DatePicker from 'react-date-picker'

const Form = (props) => {
  //local state also can be used with redux
  const [desc, setDesc] = useState('')
  const [note, setNote] = useState('')
  const [amt, setAmt] = useState('')
  const [datePicker, setDatePicker] = useState(new Date())
  const [status, setStatus] = useState('')

  const onChangeDesc = (e) => {
    if (e.target.value !== null) {
      setDesc(e.target.value)
    }
  }

  const onChangeNote = (e) => {
    if (e.target.value !== null) {
      setNote(e.target.value)
    }
  }

  const onChangeAmt = (e) => {
    if (!e.target.value || e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setAmt(e.target.value)
    }
  }

  const onDatePickChange = (datePicker) => {
    if (datePicker) {
      setDatePicker(datePicker)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!desc || !amt) {
      setStatus('Description and Amount required!')
    } else {
      setStatus(`${desc} submitted!`)
      props.onSubmit({
        description: desc,
        note: note,
        amount: parseFloat(amt, 10) * 100,
        createdAt: datePicker.getTime(),
      })
    }
    setDesc('')
    setAmt('')
    setNote('')
  }

  return (
    <div>
      <DatePicker value={datePicker} onChange={onDatePickChange} />
      {status && <p>{status}</p>}
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='expense description...'
          autoFocus
          value={desc}
          onChange={(e) => onChangeDesc(e)}
        />
        <input
          type='text'
          placeholder='amount...'
          value={amt}
          onChange={(e) => onChangeAmt(e)}
        />
        <textarea
          placeholder='note... (optional)'
          value={note}
          onChange={(e) => onChangeNote(e)}
        ></textarea>
        <button>create expense</button>
      </form>
    </div>
  )
}

export default Form
