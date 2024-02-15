function successfulLogin () {
    // This is some login code.
    Loggedin = true
    music.play(music.stringPlayable("F G A E - E - E ", 500), music.PlaybackMode.InBackground)
    wallpapers = [assets.image`Christmas`, assets.image`Mountains`]
    scene.setBackgroundImage(wallpapers[blockSettings.readNumber("selectedWallpaper")])
    cursor = sprites.create(assets.image`cur`, SpriteKind.Player)
    cursor.setStayInScreen(true)
    tiles.setCurrentTilemap(tilemap`homeMenu`)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Loggedin) {
        if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile`)) {
            radio.sendString("Chat: " + "<" + blockSettings.readString("username") + "> " + game.askForString("Chat...", 24))
        }
        if (cursor.tileKindAt(TileDirection.Center, sprites.castle.tilePath2)) {
            picture = image.create(160, 120)
            picture.fill(1)
            scene.setBackgroundImage(picture)
            cursor.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
            cursor.sayText("Push \"MENU\" to pop up a menu", 1000, false)
            color = 15
            openApp = "paint"
            tiles.setCurrentTilemap(tilemap`Blank`)
        }
        if (cursor.tileKindAt(TileDirection.Center, assets.tile`myTile0`)) {
            cursor.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
            story.showPlayerChoices("Change username", "Change group code", "Factory reset", "Wallpapers", "Exit")
            if (story.checkLastAnswer("Change username")) {
                blockSettings.writeString("username", game.askForString("What's your name", 12))
            } else if (story.checkLastAnswer("Change group code")) {
                blockSettings.writeNumber("groupCode", game.askForNumber("Your Group code please.", 6))
                radio.setGroup(blockSettings.readNumber("groupCode"))
            } else if (story.checkLastAnswer("Factory reset")) {
                pause(100)
                if (game.ask("Are you sure you want to reset to factory settings?", "Your data will be completely lost")) {
                    if (game.ask("Are you sure you want to reset to factory settings?", "Your data will be completely lost")) {
                        if (game.ask("ARE YOU SURE YOU WANT TO RESET TO FACTORY SETTINGS?", "YOUR DATA WILL BE COMPLETELY LOST")) {
                            if (game.ask("THIS IS YOUR FINAL WARNING!", "ARE YOU SURE YOU WANT TO RESET AND LOSE ALL SAVED DATA?")) {
                                blockSettings.clear()
                                game.reset()
                            }
                        }
                    }
                }
            }
        } else if (story.checkLastAnswer("Wallpapers")) {
            story.showPlayerChoices("Winter", "Mountains")
            if (story.checkLastAnswer("Winter")) {
                blockSettings.writeNumber("selectedWallpaper", 0)
            } else if (story.checkLastAnswer("Mountains")) {
                blockSettings.writeNumber("selectedWallpaper", 1)
            }
            scene.setBackgroundImage(wallpapers[blockSettings.readNumber("selectedWallpaper")])
        } else if (false) {
        	
        }
    }
})
radio.onReceivedString(function (receivedString) {
    music.play(music.stringPlayable("F G A E - E - E ", 500), music.PlaybackMode.InBackground)
    game.showLongText(receivedString, DialogLayout.Top)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (openApp == "paint") {
        story.showPlayerChoices("Save to wallpapers", "New drawing", "Fill", "Color", "Quit paint")
        if (story.checkLastAnswer("New drawing")) {
            picture = image.create(160, 120)
            picture.fill(1)
            cursor.setPosition(scene.screenWidth() / 2, scene.screenHeight() / 2)
        }
        if (story.checkLastAnswer("Quit")) {
            openApp = ""
            tiles.setCurrentTilemap(tilemap`homeMenu`)
            scene.setBackgroundImage(assets.image`Christmas`)
        }
        if (story.checkLastAnswer("Color")) {
            story.showPlayerChoices("Black", "Red")
            if (story.checkLastAnswer("Black")) {
                color = 15
            }
            if (story.checkLastAnswer("Red")) {
                color = 2
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    if (openApp == "paint") {
        picture.drawLine(cursor.x, cursor.y, lastX, lastY, color)
        lastX = cursor.x
        lastY = cursor.y
    }
})
function needLogin () {
    if (!(blockSettings.exists("hasPin"))) {
        blockSettings.writeBoolean("hasPin", game.ask("Do you want to have a pin"))
    }
    if (blockSettings.readBoolean("hasPin")) {
        if (blockSettings.exists("pin")) {
            if (blockSettings.readNumber("pin") == game.askForNumber("Enter PIN")) {
                successfulLogin()
            } else {
                game.splash("Wrong code!")
                needLogin()
            }
        } else {
            blockSettings.writeNumber("pin", game.askForNumber("What will be your pin?"))
            successfulLogin()
        }
    } else {
        successfulLogin()
    }
}
let lastY = 0
let lastX = 0
let openApp = ""
let color = 0
let picture: Image = null
let cursor: Sprite = null
let wallpapers: Image[] = []
let Loggedin = false
scene.setBackgroundImage(assets.image`Loading`)
Loggedin = false
let aButton = sprites.create(img`
    ..........666666666666..........
    ........6667777777777666........
    ......66677777777777777666......
    .....6677777779999777777766.....
    ....667777779966669977777766....
    ....677777799668866117777776....
    ...66777779966877861197777766...
    ...66777799668677686699777766...
    ...88777796688888888669777788...
    ...88777788888888888888777788...
    ...88977888679999997688877988...
    ...88977886777777777768877988...
    ...88997777777777777777779988...
    ...88799777777777777777711788...
    ...88679997777777777779117688...
    ..cc866679999999999999976668cc..
    .ccbc6666679999999999766666cbcc.
    .fcbcc66666666666666666666ccbcf.
    .fcbbcc666666666666666666ccbdcf.
    .f8bbbccc66666666666666cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb111ddccf.
    .f6ccccbbbddddddddddddd111dcccf.
    .f6ccccccbbddddddddddddddbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `, SpriteKind.Player)
aButton.setPosition(21, 93)
animation.runImageAnimation(
aButton,
[img`
    ..........666666666666..........
    ........6667777777777666........
    ......66677777777777777666......
    .....6677777779999777777766.....
    ....667777779966669977777766....
    ....677777799668866117777776....
    ...66777779966877861197777766...
    ...66777799668677686699777766...
    ...88777796688888888669777788...
    ...88777788888888888888777788...
    ...88977888679999997688877988...
    ...88977886777777777768877988...
    ...88997777777777777777779988...
    ...88799777777777777777711788...
    ...88679997777777777779117688...
    ..cc866679999999999999976668cc..
    .ccbc6666679999999999766666cbcc.
    .fcbcc66666666666666666666ccbcf.
    .fcbbcc666666666666666666ccbdcf.
    .f8bbbccc66666666666666cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb111ddccf.
    .f6ccccbbbddddddddddddd111dcccf.
    .f6ccccccbbddddddddddddddbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `,img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ..........888888888888..........
    ........8887777777777888........
    ......88877666666666677888......
    .....8877666667777666667788.....
    ....887666667788887766666788....
    ....866666677888888996666678....
    ...88666667788877889976666688...
    ...88666677888677688877666688...
    ...88666778888888888887766688...
    ...88667788888888888888776688...
    ..cc866788866777777668887668cc..
    .ccbc8668866666666666688668cbcc.
    .fcbcc86666666666666666668ccbcf.
    .fcbbcc886666666666666688ccbdcf.
    .f8bbbccc88888888888888cccbddcf.
    .f8cbbbbccccccccccccccccbdddbcf.
    .f8ccbbbbbccccccccccccb11dddccf.
    .f6ccccbbbdddddddddddd111ddcccf.
    .f6ccccccbbddddddddddd11dbbcccf.
    .f6cccccccccccccbbbbbbbbbdbcccf.
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..f6cccccccccbbbbbbbbbbbddbccf..
    ..ff6ccccccccbbbbbbbbbbbddbcff..
    ...ff6cccccccbbbbbbbbbbbddbff...
    ....ffcccccccbbbbbbbbbbbdbff....
    ......ffccccbbbbbbbbbbbbff......
    ........ffffffffffffffff........
    `],
500,
true
)
pauseUntil(() => controller.A.isPressed())
sprites.destroy(aButton)
if (!(blockSettings.exists("username"))) {
    blockSettings.writeString("username", game.askForString("What's your name", 12))
}
if (!(blockSettings.exists("groupCode"))) {
    blockSettings.writeNumber("groupCode", game.askForNumber("Your Group code please.", 6))
}
if (!(blockSettings.exists("selectedWallpaper"))) {
    blockSettings.writeNumber("selectedWallpaper", 0)
}
if (!(blockSettings.exists("usesCustomWallpaper"))) {
    blockSettings.writeBoolean("usesCustomWallpaper", false)
}
radio.setGroup(blockSettings.readNumber("groupCode"))
needLogin()
forever(function () {
    if (story.isMenuOpen()) {
        controller.moveSprite(cursor, 0, 0)
    } else {
        controller.moveSprite(cursor)
    }
})
