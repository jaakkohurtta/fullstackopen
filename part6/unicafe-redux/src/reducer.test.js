import deepFreeze from "deep-freeze"
import counterReducer from "./reducer"

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test("should return a proper initial state when called with undefined state", () => {
    let state
    const action = {
      type: "DO_NOTHING"
    }

    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  }) // Test for undefined action

  test("good is incremented", () => {
    const action = {
      type: "GOOD",
      payload: 1
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  }) // Test for action type "GOOD"

  test("ok is incremented", () => {
    const action = {
      type: "OK",
      payload: 1
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  }) // Test for action type "OK"

  test("bad is incremented", () => {
    const action = {
      type: "BAD",
      payload: 1
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  }) // Test for action type "BAD"

  test("stats are reset to 0", () => {
    const action = {
      type: "RESET",
      payload: {
        good: 0,
        ok: 0,
        bad: 0
      }
    }

    const state = {
      good: 5,
      ok: 3,
      bad: 3
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  }) // Test for action type "RESET"
})