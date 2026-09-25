import random
options=("rock","paper","scissors")
while True:
    player=input("Enter rock/paper/scissors: ")
    computer=random.choice(options)
    print(f"Player: {player}, Computer: {computer}")
    if player==computer:
        print("Tie")
    elif (player=="rock" and computer=="scissors") or (player=="paper" and computer=="rock") or (player=="scissors" and computer=="paper"):
        print("You win!")
    else:
        print("Computer wins!")
    if input("Play again? (y/n): ")!="y":
        break