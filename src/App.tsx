import React, {FC, useState} from 'react';
import './App.css';
import classes from "./styles/Main.module.css"
import cn from "classnames"

const App: FC = () => {
  const initialValueOne = 0
  const initialValueTwo = null
  const initialKeys = [false, false, false, false]
  const equalKeys = [false, false, false, false]

  const [value, setValue] = useState<number | string | undefined>(initialValueOne)
  const [valueTwo, setValueTwo] = useState<number | null>(initialValueTwo)
  const [key, setKey] = useState(initialKeys)
  const [test, setTest] = useState(equalKeys)

  const [afterEqual, setAfterEqual] = useState(false)

  const updateValue = (num: number): void => {
    if (afterEqual) {
      setValue(num)
      setValueTwo(initialValueTwo)
      setAfterEqual(false)
      return
    }

    if (value === 0) {
      return (
          setValue(num)
      )
    }

    if (value === undefined) {
      setKey(initialKeys)
      return (
          setValue(num)
      )
    }

    if (valueTwo !== null) {
      return (
          setValue(active => active + String(num))
      )
    }

    setValue(active => active + String(num))
  }

  const plus = (): void => {
    setKey([true, false, false, false])
    setTest([true, false, false, false])
    setAfterEqual(false)

    if (value === undefined) return

    if (valueTwo === null) setValueTwo(Number(value))
    setValueTwo(Number(value) + Number(valueTwo))

    setValue(undefined)
  }

  const minus = (): void => {
    setKey([false, true, false, false])
    setTest([false, true, false, false])
    setAfterEqual(false)

    if (value === undefined) return

    if (valueTwo === null) setValueTwo(Number(value))
    setValueTwo(Number(valueTwo === null ? value : valueTwo) - Number(valueTwo === null ? valueTwo : value))

    setValue(undefined)
  }

  const multiply = (): void => {
    setKey([false, false, true, false])
    setTest([false, false, true, false])
    setAfterEqual(false)

    if (value === undefined) return

    if (valueTwo === null) setValueTwo(Number(value))
    setValueTwo(Number(value) * Number(valueTwo === null ? 1 : valueTwo))

    setValue(undefined)
  }

  const divide = (): void => {
    setKey([false, false, false, true])
    setTest([false, false, false, true])
    setAfterEqual(false)

    if (value === undefined) return

    if (valueTwo === null) setValueTwo(Number(value))
    setValueTwo(Number(valueTwo === null ? value : valueTwo) / Number(valueTwo === null ? 1 : value))

    setValue(undefined)
  }

  const equalValues = (): void => {
    if (valueTwo !== null && test[0]) {
      setValue(Number(valueTwo) + Number(value === undefined ? valueTwo : value))
      setValueTwo(initialValueTwo)
      setKey(initialKeys)
      setAfterEqual(true)
    }

    if (valueTwo !== null && test[1]) {
      setValue(Number(valueTwo) - Number(value === undefined ? valueTwo : value))
      setValueTwo(initialValueTwo)
      setKey(initialKeys)
      setAfterEqual(true)
    }

    if (valueTwo !== null && test[2]) {
      setValue(Number(valueTwo) * Number(value === undefined ? valueTwo : value))
      setValueTwo(initialValueTwo)
      setKey(initialKeys)
      setAfterEqual(true)
    }

    if (valueTwo !== null && test[3]) {
      setValue(Number(valueTwo) / Number(value === undefined ? valueTwo : value))
      setValueTwo(initialValueTwo)
      setKey(initialKeys)
      setAfterEqual(true)
    }
  }

  const reverseOperator = () => {
    if (+Number(value)) {
      setValue(-Number(value))
    }
  }

  const resetValue = () => {
      if (key.some(e => !e)) {
        setValue(initialValueOne)
        if (value === initialValueOne) {
          setKey(initialKeys)
          setValueTwo(initialValueTwo)
        }
      } else {
        setTest(equalKeys)
        setValueTwo(initialValueTwo)
      }
  }

  const comma = () => {
    setValue(active => {
      const regex = /^[0-9]+\.[0-9]*$/;
      if (regex.test(String(active))) {
        return active;
      } else {
        return active + '.';
      }
    })
  }

  const percent = () => {
    setValue(Number(value) / 100)
  }

  return (
      <main className={classes.main}>
          <section className={classes.section}>
            <input className={classes.calc_field}
                   readOnly
                   value={value === undefined && valueTwo !== null ? valueTwo : value} />
            <div className={classes.row_4_4elem}>
              <button className={cn(classes.btn, classes.btn_func)}
                      onClick={resetValue}>{ value === 0 ? "AC" : "C" }</button>
              <button className={cn(classes.btn, classes.btn_func)} onClick={reverseOperator}>+/-</button>
              <button className={cn(classes.btn, classes.btn_func)} onClick={percent}>%</button>
              <button className={cn(classes.btn, key[3] ? classes.btn_opr_active : classes.btn_opr)}
                      onClick={divide}>/</button>
            </div>
            <div className={classes.row_4_4elem}>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(7)}>7</button>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(8)}>8</button>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(9)}>9</button>
              <button className={cn(classes.btn, key[2] ? classes.btn_opr_active : classes.btn_opr)}
                      onClick={multiply}>*</button>
            </div>
            <div className={classes.row_4_4elem}>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(4)}>4</button>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(5)}>5</button>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(6)}>6</button>
              <button className={cn(classes.btn, key[1] ? classes.btn_opr_active : classes.btn_opr)}
                      onClick={minus}>-</button>
            </div>
            <div className={classes.row_4_4elem}>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(1)}>1</button>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(2)}>2</button>
              <button className={cn(classes.btn, classes.btn_num)}
                      onClick={() => updateValue(3)}>3</button>
              <button className={cn(classes.btn, key[0] ? classes.btn_opr_active : classes.btn_opr)}
                      onClick={plus}>+</button>
            </div>
            <div className={classes.row_4_3elem}>
              <button className={cn(classes.btn, classes.btn_big, classes.btn_num)}
                      onClick={() => updateValue(0)}>0</button>
              <button className={cn(classes.btn, classes.btn_num)} onClick={comma}>,</button>
              <button className={cn(classes.btn, classes.btn_opr)} onClick={equalValues}>=</button>
            </div>
          </section>
      </main>
  )
}

export default App;
