def successfulLogin():
    global Loggedin, wallpapers, cursor
    Loggedin = True
    music.play(music.string_playable("F G A E - E - E ", 500),
        music.PlaybackMode.IN_BACKGROUND)
    wallpapers = [assets.image("""
            Christmas
            """),
        assets.image("""
            Mountains
            """)]
    scene.set_background_image(wallpapers[blockSettings.read_number("selectedWallpaper")])
    cursor = sprites.create(assets.image("""
        cur
        """), SpriteKind.player)
    cursor.set_stay_in_screen(True)
    tiles.set_current_tilemap(tilemap("""
        homeMenu
        """))

def on_a_pressed():
    global picture, color, openApp
    if Loggedin:
        if cursor.tile_kind_at(TileDirection.CENTER, assets.tile("""
            myTile
            """)):
            radio.send_string("Chat: " + "<" + blockSettings.read_string("username") + "> " + game.ask_for_string("Chat...", 24))
        if cursor.tile_kind_at(TileDirection.CENTER, sprites.castle.tile_path2):
            picture = image.create(160, 120)
            picture.fill(1)
            scene.set_background_image(picture)
            cursor.set_position(scene.screen_width() / 2, scene.screen_height() / 2)
            cursor.say_text("Push \"MENU\" to pop up a menu", 1000, False)
            color = 15
            openApp = "paint"
            tiles.set_current_tilemap(tilemap("""
                Blank
                """))
        if cursor.tile_kind_at(TileDirection.CENTER, assets.tile("""
            myTile0
            """)):
            cursor.set_position(scene.screen_width() / 2, scene.screen_height() / 2)
            story.show_player_choices("Change username",
                "Change group code",
                "Factory reset",
                "Wallpapers",
                "Exit")
            if story.check_last_answer("Change username"):
                blockSettings.write_string("username", game.ask_for_string("What's your name", 12))
            elif story.check_last_answer("Change group code"):
                blockSettings.write_number("groupCode",
                    game.ask_for_number("Your Group code please.", 6))
                radio.set_group(blockSettings.read_number("groupCode"))
            elif story.check_last_answer("Factory reset"):
                pause(100)
                if game.ask("Are you sure you want to reset to factory settings?",
                    "Your data will be completely lost"):
                    if game.ask("Are you sure you want to reset to factory settings?",
                        "Your data will be completely lost"):
                        if game.ask("ARE YOU SURE YOU WANT TO RESET TO FACTORY SETTINGS?",
                            "YOUR DATA WILL BE COMPLETELY LOST"):
                            if game.ask("THIS IS YOUR FINAL WARNING!",
                                "ARE YOU SURE YOU WANT TO RESET AND LOSE ALL SAVED DATA?"):
                                blockSettings.clear()
                                game.reset()
        elif story.check_last_answer("Wallpapers"):
            story.show_player_choices("Winter", "Mountains")
            if story.check_last_answer("Winter"):
                blockSettings.write_number("selectedWallpaper", 0)
            elif story.check_last_answer("Mountains"):
                blockSettings.write_number("selectedWallpaper", 1)
            scene.set_background_image(wallpapers[blockSettings.read_number("selectedWallpaper")])
        elif False:
            pass
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_received_string(receivedString):
    music.play(music.string_playable("F G A E - E - E ", 500),
        music.PlaybackMode.IN_BACKGROUND)
    game.show_long_text(receivedString, DialogLayout.TOP)
radio.on_received_string(on_received_string)

def on_menu_pressed():
    global picture, openApp, color
    if openApp == "paint":
        story.show_player_choices("Save to wallpapers",
            "New drawing",
            "Fill",
            "Color",
            "Quit paint")
        if story.check_last_answer("New drawing"):
            picture = image.create(160, 120)
            picture.fill(1)
            cursor.set_position(scene.screen_width() / 2, scene.screen_height() / 2)
        if story.check_last_answer("Quit"):
            openApp = ""
            tiles.set_current_tilemap(tilemap("""
                homeMenu
                """))
            scene.set_background_image(assets.image("""
                Christmas
                """))
        if story.check_last_answer("Color"):
            story.show_player_choices("Black", "Red")
            if story.check_last_answer("Black"):
                color = 15
            if story.check_last_answer("Red"):
                color = 2
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

def on_a_repeated():
    global lastX, lastY
    if openApp == "paint":
        picture.draw_line(cursor.x, cursor.y, lastX, lastY, color)
        lastX = cursor.x
        lastY = cursor.y
controller.A.on_event(ControllerButtonEvent.REPEATED, on_a_repeated)

def needLogin():
    if not (blockSettings.exists("hasPin")):
        blockSettings.write_boolean("hasPin", game.ask("Do you want to have a pin"))
    if blockSettings.read_boolean("hasPin"):
        if blockSettings.exists("pin"):
            if blockSettings.read_number("pin") == game.ask_for_number("Enter PIN"):
                successfulLogin()
            else:
                game.splash("Wrong code!")
                needLogin()
        else:
            blockSettings.write_number("pin", game.ask_for_number("What will be your pin?"))
            successfulLogin()
    else:
        successfulLogin()
lastY = 0
lastX = 0
openApp = ""
color = 0
picture: Image = None
cursor: Sprite = None
wallpapers: List[Image] = []
Loggedin = False
scene.set_background_image(assets.image("""
    Loading
    """))
Loggedin = False
aButton = sprites.create(img("""
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
        """),
    SpriteKind.player)
aButton.set_position(21, 93)
animation.run_image_animation(aButton,
    [img("""
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
            """),
        img("""
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
            """)],
    500,
    True)

def on_pause_until():
    pass
pause_until(on_pause_until)

sprites.destroy(aButton)
if not (blockSettings.exists("username")):
    blockSettings.write_string("username", game.ask_for_string("What's your name", 12))
if not (blockSettings.exists("groupCode")):
    blockSettings.write_number("groupCode",
        game.ask_for_number("Your Group code please.", 6))
if not (blockSettings.exists("selectedWallpaper")):
    blockSettings.write_number("selectedWallpaper", 0)
if not (blockSettings.exists("usesCustomWallpaper")):
    blockSettings.write_boolean("usesCustomWallpaper", False)
radio.set_group(blockSettings.read_number("groupCode"))
needLogin()

def on_forever():
    if story.is_menu_open():
        controller.move_sprite(cursor, 0, 0)
    else:
        controller.move_sprite(cursor)
forever(on_forever)
