export interface CurriculumDay {
  day: number;
  title: string;
  whatYouWillLearn: string;
  codeExample: string;
  gameLevel: {
    title: string;
    goal: string;
    setup: string;
    winCondition: string;
  };
}

export const pythonCurriculum: CurriculumDay[] = [
  {
    day: 1,
    title: "What is Programming & Your First Print",
    whatYouWillLearn: `### 🚀 Concept Overview
Welcome to CodeQuest! A computer is an incredibly fast machine, but it has no imagination—it only does exactly what you tell it to do, step-by-step. Writing these instructions is called **programming**. Python is a language that translates human-readable commands into computer operations. It reads almost like simple English!

Your very first command is \`print()\`. This is a built-in Python action that tells the computer: "Show this message on the screen."

### 💡 The Megaphone Analogy
Think of \`print()\` as giving your computer a megaphone. When you write \`print("Hello, world!")\`, you are handing the computer the megaphone and telling it to shout the words "Hello, world!" for the player to see.

### 🎯 Why It Matters
Every program, from a simple calculator to a massive 3D game like *Minecraft*, needs a way to talk back to you. Printing text is how a program displays scores, player health, dialogues, or menu options.

### 🔍 Code Breakdown
Let's look at today's example:
\`\`\`python
print("Hello, world!")
\`\`\`
1. **\`print\`**: The name of the command (function). It must be all lowercase.
2. **\`( )\`**: The parentheses are the "inbox" of the function. Whatever you put inside them is what the command will process.
3. **\`"Hello, world!"\`**: The quotation marks (quotes) tell Python: "This is raw text, not code commands." Python will display exactly what is between the quotes.

### ⚠️ Common Pitfalls to Avoid
- **Wrong Capitalization**: Python is picky. Writing \`Print("Hello")\` with a capital 'P' will cause an error. It must be \`print()\`.
- **Missing Quotes**: Writing \`print(Hello)\` makes Python look for a command or variable named \`Hello\`. If it can't find one, it crashes.
- **Unmatched Quotes**: Make sure you close your quotes: \`print("Hello)\` will cause a syntax error because the text never ends.`,
    codeExample: `# This is a comment. Python ignores lines starting with a hash symbol!
# Write your code below to wake up the robot:
`,
    gameLevel: {
      title: "The Awakening",
      goal: "Power up your hero robot and make it speak its first words.",
      setup: "A 5x5 digital grid. The hero robot is powered off in the center. A neon sign floats above: 'Speak to begin.'",
      winCondition: 'Write a program that uses print("I am awake") to power on the robot and open the level gate.',
    },
  },
  {
    day: 2,
    title: "Variables — Memory Boxes",
    whatYouWillLearn: `### 🚀 Concept Overview
Programs need to remember data. To do this, we use **variables**. Think of a variable as a labeled storage box inside the computer's memory. You put a piece of data inside it, put a label on the outside, and whenever you refer to that label, Python pulls out the data.

You create a variable using the assignment operator \`=\`. The label goes on the left, and the data goes on the right.

### 💡 The Storage Box Analogy
Imagine you have a cardboard box. You write "key" on the front with a marker (the variable name). Then, you drop a gold key inside it (the value). Whenever you tell your friend, "Go get what is in the 'key' box," they will bring you the gold key. In code, that looks like: \`key = "gold key"\`.

### 🎯 Why It Matters
Without variables, games couldn't track your character's name, your current level, your coin count, or whether you have the key to open a locked door. Variables allow programs to adapt and change.

### 🔍 Code Breakdown
\`\`\`python
name = "Sara"
age = 12
print(name)
\`\`\`
1. **\`name = "Sara"\`**: This tells Python to create a box labeled \`name\` and place the text \`"Sara"\` inside it.
2. **\`age = 12\`**: This creates a box labeled \`age\` and places the number \`12\` inside it.
3. **\`print(name)\`**: Notice there are **no quotation marks** around \`name\` inside the print statement! This tells Python to look for a variable box labeled \`name\`, fetch its contents (\`"Sara"\`), and print that content.

### ⚠️ Common Pitfalls to Avoid
- **Quoting Variable Names**: Writing \`print("name")\` will print the literal letters n-a-m-e. Writing \`print(name)\` will fetch the contents of the variable box.
- **Wrong Order**: You must always put the variable name on the left: \`"Sara" = name\` is invalid and will throw a syntax error.
- **Undefined Variables**: If you try to print a variable you haven't created yet (e.g., \`print(score)\` before defining \`score\`), your program will crash.`,
    codeExample: `# The scanner requires the password 'STARLIGHT'
# Create a variable named password and print it below:
`,
    gameLevel: {
      title: "The Memory Crystal",
      goal: "Retrieve the password and store it inside a crystal box to open the gate.",
      setup: "A glowing blue crystal pedestal blocks your path. A security scanner asks for the password 'STARLIGHT'.",
      winCondition: 'Create a variable named password, assign it the text "STARLIGHT", and print it. The scanner matches the type and opens the path.',
    },
  },
  {
    day: 3,
    title: "Numbers and Math",
    whatYouWillLearn: `### 🚀 Concept Overview
Computers are built for math. In Python, you work with two primary types of numbers:
1. **Integers (ints)**: Whole numbers without a decimal point (e.g., \`5\`, \`0\`, \`-42\`).
2. **Floating-point numbers (floats)**: Decimals (e.g., \`3.14\`, \`0.5\`, \`-9.8\`).

You can perform arithmetic using standard math symbols: \`+\` (addition), \`-\` (subtraction), \`*\` (multiplication), and \`/\` (division).

### 💡 The Cash Register Analogy
Think of a spreadsheet or a cash register. You scan items, it performs the multiplications and additions, keeps a running total, and shows you the final result. Python does this instantly in variables.

### 🎯 Why It Matters
In games, math is happening constantly behind the scenes. When your robot gets hit, math subtracts health points. When you collect coins, math adds them up. When you cast a spell, math checks if you have enough mana points.

### 🔍 Code Breakdown
\`\`\`python
apples = 8
friends = 4
each = apples / friends
print(each)
\`\`\`
1. **\`apples = 8\`**: Stores the integer \`8\` in the \`apples\` variable.
2. **\`friends = 4\`**: Stores the integer \`4\` in the \`friends\` variable.
3. **\`each = apples / friends\`**: Python performs the division (\`8 / 4\`) and stores the result (\`2.0\`, which is a float) in a new variable called \`each\`.
4. **\`print(each)\`**: Displays the computed value \`2.0\` to the screen.

### ⚠️ Common Pitfalls to Avoid
- **Division by Zero**: Just like in math class, you cannot divide a number by zero. Doing \`10 / 0\` will crash your program.
- **Spaces in Variable Names**: You cannot name a variable \`total coins = 10\`. Use underscores to join words: \`total_coins = 10\`.`,
    codeExample: `# Calculate the math (6 multiplied by 3) and print the result
# The bridge builder is waiting!
`,
    gameLevel: {
      title: "The Coin Bridge",
      goal: "Calculate the total cost to build a bridge across a chasm.",
      setup: "A broken bridge. There are 6 missing planks. Each plank requires 3 coins to spawn. A robotic bridge builder stands ready.",
      winCondition: "Calculate the math (6 multiplied by 3) and print the result. The bridge builder builds the planks once the number 18 is printed.",
    },
  },
  {
    day: 4,
    title: "Text (Strings) & Concatenation",
    whatYouWillLearn: `### 🚀 Concept Overview
Any text in Python is called a **string** (short for "string of characters"). It represents letters, numbers, symbols, spaces, or emojis chained together. To mark a string, you must wrap it in matching quotation marks (either double \`"\` or single \`'\`).

You can glue strings together using the plus operator \`+\`. This action is called **concatenation**.

### 💡 The Glue Analogy
Imagine you have two paper cards. One says "FIRE" and the other says "STORM". If you apply glue (the \`+\` operator) and stick them side-by-side, they become a single card reading "FIRESTORM".

### 🎯 Why It Matters
Programs frequently construct messages by joining predefined words with variables. For example, if you want to greet a player, you can concatenate \`"Hello, "\` with the variable holding their name, followed by an exclamation mark.

### 🔍 Code Breakdown
\`\`\`python
first = "Code"
last = "Quest"
title = first + last
print(title)
\`\`\`
1. **\`first = "Code"\`**: Stores the word "Code" in the variable \`first\`.
2. **\`last = "Quest"\`**: Stores the word "Quest" in the variable \`last\`.
3. **\`title = first + last\`**: Connects "Code" and "Quest" together. Note that Python will not automatically add a space. The result is \`"CodeQuest"\`.
4. **\`print(title)\`**: Prints the joined word \`CodeQuest\` to the console.

### ⚠️ Common Pitfalls to Avoid
- **Forgetting Spaces**: If you write \`"Hello" + "World"\`, the output is \`HelloWorld\`. To include a space, add it manually: \`"Hello " + "World"\` or \`"Hello" + " " + "World"\`.
- **Mixing Types**: You cannot concatenate strings and numbers directly like \`"Score: " + 10\`. Python will get confused because you are trying to "glue" a number. You will learn how to convert numbers to text next week!
- **Mismatched Quotes**: Do not start a string with a double quote and end it with a single quote: \`"Hello'\`.`,
    codeExample: `# Combine the 'FIRE' and 'STORM' runes and print the result
first = "FIRE"
last = "STORM"
# Write your spell below:
`,
    gameLevel: {
      title: "The Spell Scroll",
      goal: "Merge two ancient word runes into one powerful spell to clear the blockade.",
      setup: "Two glowing magical runes float in the chamber: 'FIRE' and 'STORM'. A thick stone wall blocks the exit.",
      winCondition: 'Concatenate the two runes together (so they form "FIRESTORM") and print it. The spell triggers and shatters the wall.',
    },
  },
  {
    day: 5,
    title: "Comments & Getting User Input",
    whatYouWillLearn: `### 🚀 Concept Overview
So far, your programs have run on autopilot. To make them truly interactive, you need a way to listen to what the user types. In Python, we use the \`input()\` function. It halts your program and waits for the player to type on their keyboard and press Enter.

Additionally, you will learn to write **comments**. Comments are notes written for humans. Python completely ignores them when running your code. You write comments by placing a hash symbol \`#\` at the start of a line.

### 💡 The Dialogue Analogy
Think of \`input()\` as asking a question in a conversation. You ask "What is your name?", hand the user a microphone, wait for them to speak, and then write down what they said.

### 🎯 Why It Matters
Interactive games require user decisions: choosing a character name, typing a direction (north/south/east/west), entering commands, or playing a text-based adventure.

### 🔍 Code Breakdown
\`\`\`python
# Ask the player for their name
name = input("What is your name? ")
print("Welcome, " + name + "!")
\`\`\`
1. **\`# Ask the player...\`**: A comment starting with \`#\`. Python skips this line.
2. **\`input("What is your name? ")\`**: This displays the text inside the parentheses as a prompt, pauses execution, and waits for the user to type something.
3. **\`name = input(...)\`**: Whatever the user types is captured and stored inside the variable box labeled \`name\`.
4. **\`print("Welcome, " + name + "!")\`**: Glues the greeting, the user's input, and an exclamation mark together, then prints it.

### ⚠️ Common Pitfalls to Avoid
- **Input is Always Text**: The \`input()\` function always returns a string. If the user types \`25\`, Python treats it as the text string \`"25"\`, not the mathematical number \`25\`. You cannot do math with it directly without converting it!`,
    codeExample: `# Ask the user for input and print a customized response
# Ensure your print message contains 'Welcome' or 'Hello'
`,
    gameLevel: {
      title: "The Gatekeeper's Question",
      goal: "Initialize the gatekeeper statue by introducing yourself using interactive input.",
      setup: "A massive, talking stone statue gate. It glows red and blocks your way. It says: 'Who goes there?'",
      winCondition: "Use the input() command to ask for the name, store it in a variable, and print a welcome message. The gatekeeper registers the identity, turns green, and rises.",
    },
  },
];

export const javaCurriculum: CurriculumDay[] = [
  {
    day: 1,
    title: "Introduction to Java & Your First Class",
    whatYouWillLearn: `### 🚀 Concept Overview
Java is a structured, powerful programming language used to build Android apps, huge corporate systems, and games like *Minecraft*. Java code is not run directly by your computer; instead, it is compiled (translated) into bytecode, which runs on the **JVM (Java Virtual Machine)**. This allows Java to run on virtually any device!

Java is strictly organized. Every line of code must live inside a **class**, and execution always starts inside a special method called the **main method**. To show text on the screen, we use \`System.out.println()\`.

### 💡 The Blueprint Analogy
Think of a Java file as a blueprint for a machine. The **class** (\`public class Main\`) is the outer shell of the machine. The **main method** (\`public static void main...\`) is the green "Power On" button. When the button is pressed, the machine performs the instructions written inside it, one by one.

### 🎯 Why It Matters
Java's strict rules might seem like extra work at first, but they prevent many common coding mistakes. Learning Java teaches you clean, structured habits that are used by millions of software engineers worldwide.

### 🔍 Code Breakdown
Let's analyze today's boilerplate code:
\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
\`\`\`
1. **\`public class Main\`**: Declares a class named \`Main\`. In Java, your class name must match the name of the file it is written in (e.g., \`Main.java\`).
2. **\`public static void main(String[] args)\`**: The entry point of every Java program. This is where Java starts reading code.
   - **\`public\`**: Means this method can be accessed and run from outside the class.
   - **\`static\`**: Means the method can be run without creating a new instance of the class.
   - **\`void\`**: Means this method performs an action but doesn't return a value.
   - **\`String[] args\`**: Part of the standard Java setup, allowing you to pass parameters into the program.
3. **\`System.out.println("...")\`**: The command to display text on the screen. It stands for: System (computer system), out (output stream), println (print a line of text and move to the next line).
4. **\`{ }\`**: Braces define blocks of code. The inner block belongs to the main method, and the outer block belongs to the class.
5. **\`;\`**: The semicolon is crucial. In Java, every standalone statement **must** end with a semicolon, acting like a period at the end of a sentence.

### ⚠️ Common Pitfalls to Avoid
- **Forgetting Semicolons**: Java will fail to compile if you miss a semicolon \`;\` at the end of statements.
- **Wrong Case**: Java is strictly case-sensitive. Writing \`system.out.println\` or \`String\` as \`string\` will fail compilation.
- **Brace Mismatch**: Make sure every opening brace \`{\` has a matching closing brace \`}\`.`,
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Write your code here to wake up the robot:
        
    }
}`,
    gameLevel: {
      title: "The Awakening (Java)",
      goal: "Write your first structured Java class and activate your sleeping robot.",
      setup: "A 5x5 digital grid. The robot is powered down. A neon display reads: 'Main entry point required.'",
      winCondition: "Write a Main class containing a main method that prints 'I am awake' with a trailing semicolon. The robot boots up, and the exit gate opens.",
    },
  },
  {
    day: 2,
    title: "Variables & Strict Data Types",
    whatYouWillLearn: `### 🚀 Concept Overview
In Python, variables can hold any kind of data automatically. Java is different: it is **statically typed**. This means you must declare the exact type of data a variable will hold before you can use it. Once a type is set, it cannot hold a different type of data.

Java's main basic types (primitives) are:
1. **\`int\`**: For whole numbers (e.g., \`12\`, \`-500\`).
2. **\`double\`**: For decimal numbers (e.g., \`4.99\`, \`-0.01\`).
3. **\`boolean\`**: For true/false values.
4. **\`char\`**: For a single character in single quotes (e.g., \`'A'\`, \`'?'\`).

For text, Java uses the **\`String\`** class (which starts with a capital 'S' and uses double quotes \`"\`).

### 💡 The Shaped Slots Analogy
Imagine a child's toy sorting box with star, square, and triangle slots. A variable in Java is like one of these slots. If you declare a variable as an \`int\`, it is a square slot. You can only drop square blocks (integers) inside. Attempting to force a circle (text String) in there will crash the compiler!

### 🎯 Why It Matters
Strict typing makes Java code incredibly fast and safe. If you try to do something impossible by mistake (like divide a word by a number), Java catch it instantly before you run the code, saving hours of debugging time.

### 🔍 Code Breakdown
\`\`\`java
int age = 12;
double price = 4.99;
boolean isReady = true;
String name = "Sara";
System.out.println(name);
\`\`\`
1. **\`int age = 12;\`**: Creates a variable box of type \`int\` (integer) named \`age\` and puts \`12\` in it.
2. **\`double price = 4.99;\`**: Creates a box of type \`double\` (decimal) and stores \`4.99\`.
3. **\`String name = "Sara";\`**: Note the capital \`S\` in \`String\`. It stores text inside double quotes.
4. **\`System.out.println(name);\`**: Prints the content stored inside the \`name\` variable.

### ⚠️ Common Pitfalls to Avoid
- **Type Mismatch**: Writing \`int score = "High";\` will fail compilation because you're placing text in an integer box.
- **Lowercased string**: Writing \`string name = "Sara";\` is a syntax error. Java expects a capital 'S' for \`String\`.
- **Single vs Double Quotes**: Character primitives (\`char\`) use single quotes (e.g., \`'X'\`), whereas text strings (\`String\`) use double quotes (e.g., \`"Hello"\`). Using the wrong quotes causes compiler errors.`,
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Declare a String named password with the value "STARLIGHT" and print it:
        
    }
}`,
    gameLevel: {
      title: "The Memory Crystal (Java)",
      goal: "Use a strictly typed String variable to pass the crystal lock.",
      setup: "A locked ancient door. A crystal socket is labeled: 'String Type Only'. The password to open it is 'STARLIGHT'.",
      winCondition: 'Declare a String variable named password, assign it "STARLIGHT", and print it. The door recognizes the correct type and slides open.',
    },
  },
  {
    day: 3,
    title: "Numbers and Arithmetic",
    whatYouWillLearn: `### 🚀 Concept Overview
Java performs math calculations using standard operators: \`+\` (add), \`-\` (subtract), \`*\` (multiply), and \`/\` (divide).

However, Java has a unique rule regarding division: **Integer Division**.
If you divide an integer by an integer, Java expects the result to also be an integer. It will throw away any decimal remainder (it does not round; it just cuts the decimal off!).
For example:
- \`7 / 2\` in Java equals \`3\` (not \`3.5\`!).
If you want to keep the decimal, at least one of the numbers must be a \`double\`:
- \`7.0 / 2\` or \`7 / 2.0\` equals \`3.5\`.

### 💡 The Knife Analogy
Imagine cutting a cake. If you divide 7 slices between 2 people using an "integer knife", Java cuts the slices, hands 3 slices to each person, and simply throws the remaining slice in the trash rather than dividing it. If you use a "double knife" (using decimals), you can cut it perfectly into \`3.5\` slices.

### 🎯 Why It Matters
Integer division is one of the most common surprises for beginner programmers. If you are calculating averages, currencies, or coordinates, forgetting this rule can lead to subtle math bugs in your code.

### 🔍 Code Breakdown
\`\`\`java
int apples = 8;
int friends = 4;
int each = apples / friends;
System.out.println(each);
\`\`\`
1. **\`apples / friends\`**: Performs the division \`8 / 4\` and returns the integer \`2\`.
2. **\`int each = ...\`**: Stores the integer result in a variable named \`each\`.
3. If we had written \`double result = 7 / 2;\`, Java would perform the integer division first (\`7 / 2 = 3\`) and *then* store it in the double as \`3.0\`. To fix it, you write \`double result = 7.0 / 2;\` to get \`3.5\`.

### ⚠️ Common Pitfalls to Avoid
- **Unexpected Zeroes**: Doing \`int fraction = 1 / 2;\` will set \`fraction\` to \`0\`, because \`0.5\` has the decimal cut off.
- **Forgetting Parentheses**: When doing math inside a print statement combined with strings, use parentheses to avoid Java turning math into text stitching: \`System.out.println("Total: " + 6 * 3)\` is fine, but \`System.out.println("Total: " + 6 + 3)\` results in "Total: 63" unless written as \`"Total: " + (6 + 3)\`.`,
    codeExample: `public class Main {
    public static void main(String[] args) {
        // Calculate 6 multiplied by 3 and print the total:
        
    }
}`,
    gameLevel: {
      title: "The Coin Bridge (Java)",
      goal: "Calculate the mathematical resources needed to construct a bridge planks.",
      setup: "A broken drawbridge across a neon-glowing canyon. The interface indicates that 6 gaps need 3 planks each to close.",
      winCondition: "Calculate the math inside the main method (6 times 3) and print the result. The planks materialize, sealing the bridge.",
    },
  },
  {
    day: 4,
    title: "Java Strings & Concatenation",
    whatYouWillLearn: `### 🚀 Concept Overview
In Java, a \`String\` is not a basic primitive type; it is an object representing a sequence of characters. It is wrapped in double quotes \`"\`.

You can combine strings using the \`+\` operator. This process is called **string concatenation**.
A very convenient feature of Java: if you combine a String with any other data type (like an \`int\` or a \`double\`), Java will automatically convert that number into a String and stitch them together.

### 💡 The Train Analogy
Think of String concatenation as linking train carriages. The engine is a text String. You can link another text carriage (\`"Hello " + "World"\`), or you can hook up a passenger car carrying a number carriage (\`"Score: " + 100\`). Java links them together into one long train representing a single message.

### 🎯 Why It Matters
Stitching strings and values is how programs output dynamic notifications, like "Score: 100", "Remaining Lives: 3", or "Quest Completed in 5 minutes".

### 🔍 Code Breakdown
\`\`\`java
String first = "Code";
String last = "Quest";
String title = first + last;
System.out.println(title);
\`\`\`
1. **\`first + last\`**: Combines the values of \`first\` ("Code") and \`last\` ("Quest") into a single String: \`"CodeQuest"\`.
2. **\`System.out.println("Value is " + 50);\`**: Java converts the integer \`50\` to the string \`"50"\` and prints: \`Value is 50\`.

### ⚠️ Common Pitfalls to Avoid
- **Single Quotes**: Do not use single quotes for text! Writing \`String name = 'Sara';\` is a syntax error. Single quotes are reserved strictly for single characters (\`char\`).
- **String Comparison**: In Java, you should never compare two Strings using \`==\` (e.g. \`name == "Sara"\`). \`==\` checks if they are the exact same object in memory, which can lead to bugs. Instead, always use the \`.equals()\` method: \`name.equals("Sara")\`. You will practice this in the future!`,
    codeExample: `public class Main {
    public static void main(String[] args) {
        String first = "FIRE";
        String last = "STORM";
        // Stitch the strings together using the + operator and print the result:
        
    }
}`,
    gameLevel: {
      title: "The Spell Scroll (Java)",
      goal: "Synthesize two word strings into a unified incantation.",
      setup: "A wizard altar holding two scrolls labeled 'FIRE' and 'STORM'. An ice barrier blocks the way.",
      winCondition: "Stitch the strings 'FIRE' and 'STORM' using the + operator, store it, and print it. The combined spell FIRESTORM melts the barrier.",
    },
  },
  {
    day: 5,
    title: "Comments & Reading Input (Scanner)",
    whatYouWillLearn: `### 🚀 Concept Overview
To make a Java program interactive, we need a way to read typed keyboard input. Java provides a built-in helper class called **\`Scanner\`** located in the \`java.util\` package.

To use the Scanner, you must perform two steps:
1. **Import the class**: Write \`import java.util.Scanner;\` at the very top of your file, before the class declaration.
2. **Create the Scanner object**: Inside the main method, initialize the scanner: \`Scanner sc = new Scanner(System.in);\`. Here, \`System.in\` represents the keyboard input stream.

You can then read text using \`sc.nextLine()\` (which reads a line of text) or \`sc.nextInt()\` (which reads an integer).

We also write **comments** in Java:
- \`//\` for a single-line comment.
- \`/* ... */\` for a multi-line comment.

### 💡 The Translator Analogy
Think of the \`Scanner\` as hiring a translator. You tell the translator to watch the keyboard stream (\`System.in\`). When the user writes something and hits Enter, the translator translates that keystroke data into a neat String and hands it to your variable.

### 🎯 Why It Matters
Interactive command-line applications, menus, database requests, and games need input. The Scanner is the standard tool in Java for receiving user commands.

### 🔍 Code Breakdown
\`\`\`java
import java.util.Scanner; // Import the tool

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in); // Setup the reader
        System.out.print("Name? ");
        String name = sc.nextLine();         // Wait for user and read line
        System.out.println("Welcome, " + name);
    }
}
\`\`\`
1. **\`import java.util.Scanner;\`**: Tells Java we want to use the Scanner library.
2. **\`Scanner sc = new Scanner(System.in);\`**: Instantiates a Scanner named \`sc\`.
3. **\`sc.nextLine()\`**: Pauses the program and waits for input. When Enter is pressed, it returns the text.
4. **\`String name = ...\`**: Stores that entered text in the variable \`name\`.

### ⚠️ Common Pitfalls to Avoid
- **Forgetting the Import**: If you forget \`import java.util.Scanner;\`, Java will throw a "cannot find symbol: class Scanner" error.
- **Case Sensitivity**: Be careful with capitalization: \`Scanner\` must be capitalized, as well as the 'S' in \`System.in\`.
- **Leftover Newlines**: If you call \`sc.nextInt()\` and then \`sc.nextLine()\`, the program might skip the text input. For now, use \`sc.nextLine()\` for reading text safely.`,
    codeExample: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // Create a Scanner, read the name, and print the welcome message:
        
    }
}`,
    gameLevel: {
      title: "The Gatekeeper's Question (Java)",
      goal: "Use a Scanner to ask the gatekeeper statue for entry permissions.",
      setup: "A grand gate guarded by an iron sentinel statue. The pedestal reads: 'Enter your name to register.'",
      winCondition: "Import and configure a Scanner. Read the name using nextLine(), and print 'Welcome, ' followed by that name. The gate slides upward.",
    },
  },
];
