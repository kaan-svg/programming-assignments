import random
dice_art={1:("┌─────────┐","│         │","│    ●    │","│         │","└─────────┘"),
2:("┌─────────┐","│  ●      │","│         │","│      ●  │","└─────────┘")}
num=int(input("How many dice? "))
dice=[random.randint(1,6) for _ in range(num)]
for line in range(5):
    for die in dice:
        print(dice_art.get(die,[""]*5)[line], end=" ")
    print()
print("Total:",sum(dice))