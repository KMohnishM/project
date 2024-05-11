
a = [(8, 2), (12, 3), (15, 10), (23, 14), (28, 1)]  # snakes
b = [(4, 11), (9, 21), (13, 27), (17, 24), (22, 27)]  # ladders

def broad(current_position):
    for i in a:
        if current_position == i[0]:
            current_position= i[1]
    for i in b:
        if current_position == i[0]:
            current_position= i[1]
    return current_position

def game():
    player1_position = 0
    player2_position = 0
    while True:
        player1_dice = int(input("Player 1, roll the dice: "))
        if player1_dice>6 or player1_dice<0 :
           print('invalid input')
        if  player1_dice+player1_position <=30:
         player1_position += player1_dice
        player1_position = broad(player1_position)

        player2_dice = int(input("Player 2, roll the dice: "))
        if player1_dice>6 or player1_dice<0 :
           print('invalid input')
        if  player2_dice+player2_position <=30:
         player2_position += player2_dice
        player2_position = broad(player2_position)

        print("Player 1 position:", player1_position)
        print("Player 2 position:", player2_position)

        
        if player1_position == 30:
            print('Player 1 won the game!')
            break
        elif player2_position == 30:
            print('Player 2 won the game!')
            break

game()

     





# 30 29 28 27 26
# 21 22 23 24 25
# 20 19 18 17 16 
# 11 12 13 14 15
# 10 9 8 7 6
# 1 2 3 4 5 