const GAME = {
  x: null,
  y: null,
  prev_x: null,
  prev_y: null,
  map: 0,
  keys: [],
  portal_lock: false,
  portals: [],
  start: null,
  red_count: 0,
  maps: 0
}

/*  0   = disabled field
    1   = path
    2.? = key
    3.? = door
    4.? = portal
    5   = blinking field
    6   = finish
    7   = start
*/

const ORIGIN = {
  "template": [
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
  ], 0: [
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "7", "1", "1", "6", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
  ], 1: [
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "6", "0", "0"],
    ["0", "7", "1", "1", "1", "1", "0", "1", "0", "0"],
    ["0", "0", "0", "0", "0", "1", "0", "1", "0", "0"],
    ["0", "0", "0", "0", "1", "1", "0", "1", "0", "0"],
    ["0", "0", "0", "0", "1", "0", "0", "1", "0", "0"],
    ["0", "0", "0", "0", "1", "1", "1", "1", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
  ], 2: [
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "7", "1", "1", "1", "3.2", "1", "1", "6", "0"],
    ["0", "0", "2.2", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
  ], 3: [
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "4.1", "1", "1", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "1", "2.1", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "7", "1", "4.1", "1", "3.1", "1", "1", "6", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
  ], 4: [
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "7", "1", "5", "1", "5", "1", "6", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
  ], 5: [
    ["0", "7", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "1", "0", "0", "0", "4.2", "1", "1", "5", "0"],
    ["0", "5", "0", "0", "0", "0", "0", "0", "2.2", "0"],
    ["1", "5", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "5", "0", "2.1", "5", "5", "1", "4.1", "0", "0"],
    ["1", "5", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["0", "5", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["1", "5", "0", "4.1", "0", "4.2", "0", "0", "0", "0"],
    ["0", "5", "0", "1", "0", "1", "0", "0", "0", "0"],
    ["1", "5", "1", "1", "3.1", "1", "3.2", "1", "6", "0"]
  ], 6: [
    ["7", "1", "5", "1", "5", "1", "0", "2.2", "1", "4.1"],
    ["0", "0", "0", "0", "0", "1", "0", "0", "0", "0"],
    ["0", "1", "5", "1", "5", "1", "0", "0", "0", "0"],
    ["0", "1", "0", "0", "0", "0", "0", "5", "4.1", "0"],
    ["0", "1", "5", "1", "5", "1", "0", "5", "0", "0"],
    ["0", "0", "0", "0", "0", "1", "0", "5", "0", "0"],
    ["0", "1", "5", "1", "5", "1", "0", "5", "3.2", "1"],
    ["0", "1", "0", "0", "0", "0", "0", "5", "0", "1"],
    ["0", "1", "5", "1", "5", "1", "1", "1", "0", "3.1"],
    ["0", "0", "0", "0", "0", "0", "2.1", "0", "0", "6"]
  ], 7: [
    ["7", "0", "0", "0", "0", "0", "4.2", "5", "5", "5"],
    ["1", "1", "1", "1", "4.1", "0", "0", "0", "0", "2.7"],
    ["1", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    ["3.1", "1", "3.5", "2.3", "3.7", "0", "4.4", "1", "6", "0"],
    ["1", "0", "0", "0", "5", "0", "0", "0", "0", "0"],
    ["1", "2.4", "4.3", "0", "5", "0", "0", "0", "2.1", "4.1"],
    ["3.6", "0", "0", "0", "5", "0", "2.6", "0", "0", "3.4"],
    ["4.4", "0", "0", "0", "2.2", "0", "1", "0", "0", "2.5"],
    ["0", "0", "0", "0", "0", "0", "3.2", "0", "0", "3.3"],
    ["4.3", "5", "5", "5", "5", "5", "5", "0", "0", "4.2"]
  ], 8: [
    ["7", "4.1", "0", "0", "0", "0", "0", "2.4", "5", "5"],
    ["3.1", "0", "0", "5", "1", "5", "0", "0", "0", "4.5"],
    ["6", "0", "0", "5", "0", "5", "0", "0", "0", "0"],
    ["0", "0", "2.1", "5", "0", "4.6", "0", "4.6", "3.5", "2.2"],
    ["2.5", "0", "0", "0", "0", "0", "0", "0", "0", "5"],
    ["5", "5", "5", "1", "0", "4.5", "0", "0", "0", "5"],
    ["0", "0", "0", "3.4", "0", "3.3", "0", "0", "0", "5"],
    ["0", "2.3", "0", "4.3", "0", "4.2", "0", "5", "3.2", "5"],
    ["0", "5", "0", "5", "0", "5", "0", "1", "0", "5"],
    ["4.4", "5", "0", "4.4", "0", "4.3", "0", "4.2", "0", "4.1"]
  ], 9: [
    ["7", "5", "5", "5", "5", "5", "5", "5", "5", "5"],
    ["0", "0", "0", "0", "0", "2.1", "0", "0", "0", "5"],
    ["4.1", "0", "4.2", "1", "0", "0", "0", "4.2", "0", "5"],
    ["5", "0.", "0", "5.100", "5.100", "0", "0", "1", "3.4", "4.1"],
    ["3.1", "0", "0", "0", "5.100", "1", "0", "0", "0", "0"],
    ["5", "0", "4.4", "0", "0", "5", "5.50", "5.100", "5.150", "5"],
    ["5", "0", "3.3", "2.7", "0", "0", "0", "2.3", "0", "5"],
    ["5", "0", "0", "4.3", "0", "0", "0", "0", "0", "5"],
    ["5", "5", "0", "0", "0", "3.7", "1", "4.4", "0", "1"],
    ["0", "5", "1", "2.4", "0", "6", "0", "0", "0", "4.3"]
  ]
}

let MAPS = JSON.parse(JSON.stringify(ORIGIN))

const COLOR = {
  0: "#FFFFFF",
  1: "#FF0000",
  2: "#00FF00",
  3: "#0000FF",
  4: "#FF00FF",
  5: "#FFFF00",
  6: "#00FFFF",
  7: "#FFFFFF"
}

const VISUALS = {
  key1: null,
  key2: null,
  key3: null,
  key4: null,
  key5: null,
  key6: null,
  key7: null,
  flag: null
}

function preload() {
  VISUALS.key1 = loadImage("visuals/key1.png")
  VISUALS.key2 = loadImage("visuals/key2.png")
  VISUALS.key3 = loadImage("visuals/key3.png")
  VISUALS.key4 = loadImage("visuals/key4.png")
  VISUALS.key5 = loadImage("visuals/key5.png")
  VISUALS.key6 = loadImage("visuals/key6.png")
  VISUALS.key7 = loadImage("visuals/key7.png")

  VISUALS.flag = loadImage("visuals/flag.png")
}

function setup() {
  createCanvas(1920, 1080)
  frameRate(50)

  stroke("#FFFFFF")
  strokeWeight(2)
  noFill()

  textSize(50)
  textFont("Courier New")

  reset(false)
}

function reset(nextMap = true) {
  MAPS = JSON.parse(JSON.stringify(ORIGIN))
  if (nextMap) {
    GAME.map++
    GAME.maps++
  }
  if (GAME.map === Object.keys(ORIGIN).length - 1) {
    GAME.map = 0
  }
  GAME.portals = []
  GAME.keys = []
  GAME.portal_lock = false
  let portals = {}
  let count_x = 0
  let count_y = 0
  for (let x of ORIGIN[GAME.map]) {
    count_x++
    count_y = 0
    for (let y of x) {
      count_y++
      if (y.split(".")[0] === "4") {
        if (portals.hasOwnProperty(y.split(".")[1])) {
          portals[y.split(".")[1]] += "-" + count_x + "." + count_y
        } else {
          portals[y.split(".")[1]] = count_x + "." + count_y
        }
      } else if (y.split(".")[0] === "7") {
        GAME.x = count_y
        GAME.y = count_x
        prev()
      }
    }
  }
  for (let i of Object.keys(portals)) {
    GAME.portals.push(portals[i])
  }
  GAME.start = GAME.x + "." + GAME.y
}

function prev(reverse = false) {
  if (reverse) {
    GAME.x = GAME.prev_x
    GAME.y = GAME.prev_y
  } else {
    GAME.prev_x = GAME.x
    GAME.prev_y = GAME.y
  }
}

function draw() {
  background("#000000")

  fill("#FFFFFF")
  text("Maps: " + GAME.maps, 20, 50)
  text("Time: " + (millis() / 1000).toFixed(2) + " s", 20, 100)
  noFill()

  if (GAME.red_count > 0) { GAME.red_count-- }

  let field = MAPS[GAME.map][GAME.y - 1][GAME.x - 1]
  let index = field.split(".")[0]
  let property = field.split(".")[1] || 0

  // disabled?
  if (index === "0") {
    prev(true)
  }

  // field?
  else if (index === "1") {
    prev()
    GAME.portal_lock = false
  }

  // key?
  else if (index === "2") {
    GAME.keys.push(property)
    MAPS[GAME.map][GAME.y - 1][GAME.x - 1] = "1"
  }

  // door?
  else if (index === "3") {
    if (GAME.keys.includes(property)) {
      MAPS[GAME.map][GAME.y - 1][GAME.x - 1] = "1"
      GAME.keys.splice(GAME.keys.indexOf(property), 1)
    } else {
      prev(true)
      GAME.red_count = 10
    }
  }

  // portal?
  else if (index === "4" && !GAME.portal_lock) {
    let activated = false
    for (let i of GAME.portals) {
      let start_field = i.split("-")[0]
      let end_field = i.split("-")[1]
      if (start_field.split(".")[0] == GAME.y && start_field.split(".")[1] == GAME.x) {
        GAME.y = end_field.split(".")[0]
        GAME.x = end_field.split(".")[1]
        prev()
        activated = true
      }
    }
    if (!activated) {
      for (let i of GAME.portals) {
        let start_field = i.split("-")[0]
        let end_field = i.split("-")[1]
        if (end_field.split(".")[0] == GAME.y && end_field.split(".")[1] == GAME.x) {
          GAME.y = start_field.split(".")[0]
          GAME.x = start_field.split(".")[1]
          prev()
        }
      }
    }
    GAME.portal_lock = true
  }

  // dead?
  else if (index === "5") {
    prev()
    GAME.portal_lock = false
    if (property < 100) {
      GAME.x = GAME.start.split(".")[0]
      GAME.y = GAME.start.split(".")[1]
      GAME.red_count = 25
      reset(false)
    }
  }

  // finished?
  else if (field === "6") { reset() }

  // start?
  else if (field === "7") {
    MAPS[GAME.map][GAME.y - 1][GAME.x - 1] = "1"
  }

  // map
  let count_x = -1
  let count_y = -1
  for (let x of MAPS[GAME.map]) {
    count_x++
    count_y = -1
    for (let y of x) {
      count_y++
      switch (y.split(".")[0]) {
        case "0":
          break;

        case "1":
          rect(460 + count_y * 100, count_x * 100, 100, 100)
          break;

        case "2":
          rect(460 + count_y * 100, count_x * 100, 100, 100)
          image(VISUALS["key" + y.split(".")[1]], 485 + count_y * 100, 25 + count_x * 100)
          break;

        case "3":
          rect(460 + count_y * 100, count_x * 100, 100, 100)
          stroke(COLOR[y.split(".")[1]])
          rect(480 + count_y * 100, 20 + count_x * 100, 60, 60)
          stroke("#FFFFFF")
          image(VISUALS["key" + y.split(".")[1]], 485 + count_y * 100, 25 + count_x * 100)
          break;

        case "4":
          rect(460 + count_y * 100, count_x * 100, 100, 100)
          stroke("#9000FF77")
          fill("#9000FF77")
          rect(480 + count_y * 100, 20 + count_x * 100, 60, 60)
          noFill()
          stroke("#FFFFFF")
          break;

        case "5":
          if (y === "5") { y = "5.200" }
          if (y.split(".")[1] > 100) {
            fill("#330000")
          } else {
            fill("#FF0000")
          }
          rect(460 + count_y * 100, count_x * 100, 100, 100)
          noFill()
          MAPS[GAME.map][count_x][count_y] = "5." + (y.split(".")[1] - 1)
          if (y.split(".")[1] < 0) {
            MAPS[GAME.map][count_x][count_y] = "5.200"
          }
          break;

        case "6":
          stroke("#FFFFFF")
          rect(460 + count_y * 100, count_x * 100, 100, 100)
          image(VISUALS.flag, 485 + count_y * 100, 25 + count_x * 100)
          break;
      }
    }
  }

  // player
  noStroke()
  GAME.red_count > 0 ? fill("#FF0000") : fill("#FFFFFF")
  rect(495 + (GAME.x - 1) * 100, 35 + (GAME.y - 1) * 100, 30, 30)
  noFill()
  stroke("#FFFFFF")

  // keys
  let pos = 0
  for (let i of GAME.keys) {
    image(VISUALS["key" + i], 25 + pos % 4 * 100, 150 + (pos - pos % 4) / 4 * 100, 100, 100)
    pos++
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    GAME.x < 10 ? GAME.x++ : 0
  } else if (keyCode === LEFT_ARROW) {
    GAME.x > 1 ? GAME.x-- : 0
  } else if (keyCode === UP_ARROW) {
    GAME.y > 1 ? GAME.y-- : 0
  } else if (keyCode === DOWN_ARROW) {
    GAME.y < 10 ? GAME.y++ : 0
  }
}