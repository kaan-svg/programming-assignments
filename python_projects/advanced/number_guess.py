import random
low, high=1,100
answer=random.randint(low,high)
guesses=0
while True:
    guess=input("Enter guess: ")
    if guess.isdigit():
        guess=int(guess)
        guesses+=1
        if guess<answer:
            print("Too low")
        elif guess>answer:
            print("Too high")
        else:
            print(f"Correct! The answer was {answer}. Attempts: {guesses}")
            break
    else:
        print("Invalid input")