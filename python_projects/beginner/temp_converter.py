# Derece Dönüştürücü
unit= input("C/F? ")
temp= float(input("Enter temperature: "))
if unit.upper()=="C":
    temp=(9*temp)/5 +32
    print(f"{temp} °F")
elif unit.upper()=="F":
    temp=(temp-32)*(5/9)
    print(f"{temp} °C")
else:
    print("Invalid unit")