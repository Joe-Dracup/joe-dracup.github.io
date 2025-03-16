---
date: 2025-03-16
title: Crossing Boundaries - Type Narrowing in TypeScript from a C# Perspective
---

As a C# engineer, one of the most challenging aspects of TypeScript to grasp has been the concept of type narrowing. C# simply has nothing directly comparable. The more I explore this feature, the more powerful I find it, enabling solutions that would be impossible with C#'s more rigid type system.

## Understanding the Fundamental Differences

In C#, we live in a nominally typed world where explicit type declarations rule. A class either inherits from or implements a specific interface, and these relationships must be formally declared. The compiler knows exactly what each object is, and type checking revolves around these explicit hierarchies.

TypeScript, however, embraces structural typing (often called "duck typing" - if it walks like a duck and quacks like a duck, it's a duck). What matters isn't whether an object explicitly declares itself as a particular type, but whether it has the required properties and methods. This is a profound difference from C#'s approach.

![Type System Comparison](https://placeholder.com/typescript-vs-csharp-type-systems.png)

Because of this fundamental difference, we can use the TypeScript compiler to intelligently determine what an object should look like under certain circumstances. This capability is transformative - it allows functions to return differently shaped objects based on context, creating more expressive and flexible APIs.

## Type Narrowing in Practice

When working with union types in TypeScript, you'll often need to handle different types in specialized ways. Consider this scenario where we have multiple creature types:

```typescript
type Animal = {
  name: string;
  prey: string;
  sleepHours: number;
};
type Human = {
  name: string;
  age: number;
};
type Ghost = {
  name: string;
  colour: 'red' | 'blue';
};
type Creature = Animal | Human | Ghost;
```

If we attempt to access properties that don't exist across all union members, TypeScript will raise an error:

```typescript
function logWithMetaData(critter: Creature) {
  console.log(critter.name); // Works because 'name' exists on all types
  console.log(critter.colour); // Error: Property 'colour' doesn't exist on type 'Creature'
}
```

This is where TypeScript's type narrowing becomes essential. Let's explore the various techniques available.

## Type Guards: The Full Arsenal

### Property Checks with 'in'

The `in` operator checks for property existence:

```typescript
function logWithMetaData(critter: Creature) {
  console.log(critter.name);
  if ('colour' in critter) {
    console.log(critter.colour); // TypeScript now knows this is a Ghost
  }
  if ('age' in critter) {
    console.log(`Human age: ${critter.age}`); // TypeScript now knows this is a Human
  }
  if ('prey' in critter) {
    console.log(`Animal hunts: ${critter.prey}`); // TypeScript now knows this is an Animal
  }
}
```

### Type Checks with 'typeof'

For primitive types, `typeof` provides narrowing:

```typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    console.log(value.toUpperCase()); // TypeScript knows this is a string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows this is a number
  }
}
```

### Instance Checks with 'instanceof'

For class instances, `instanceof` works similarly to C#'s `is` operator:

```typescript
class AnimalClass {
  name: string;
  prey: string;
  constructor(name: string, prey: string) {
    this.name = name;
    this.prey = prey;
  }
}

class HumanClass {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

function processCreature(creature: AnimalClass | HumanClass) {
  if (creature instanceof AnimalClass) {
    console.log(`Animal hunts: ${creature.prey}`);
  } else {
    console.log(`Human age: ${creature.age}`);
  }
}
```

### User-Defined Type Predicates

For more complex scenarios, custom type guards provide ultimate flexibility:

```typescript
function isAnimal(creature: Creature): creature is Animal {
  return 'prey' in creature;
}

function isHuman(creature: Creature): creature is Human {
  return 'age' in creature;
}

function isGhost(creature: Creature): creature is Ghost {
  return 'colour' in creature;
}

function processCreature(creature: Creature) {
  if (isAnimal(creature)) {
    console.log(`Animal ${creature.name} hunts ${creature.prey}`);
  } else if (isHuman(creature)) {
    console.log(`Human ${creature.name} is ${creature.age} years old`);
  } else if (isGhost(creature)) {
    console.log(`Ghost ${creature.name} is ${creature.colour}`);
  }
}
```

## Discriminated Unions: TypeScript's Elegant Solution

While the above approaches work, they can become cumbersome for complex types. The discriminated union pattern adds a literal "type tag" to each interface, creating a clear way to differentiate between union members:

```typescript
type Animal = {
  name: string;
  prey: string;
  sleepHours: number;
  type: 'Animal'; // Type discriminator
};
type Human = {
  name: string;
  age: number;
  type: 'Human'; // Type discriminator
};
type Ghost = {
  name: string;
  colour: 'red' | 'blue';
  type: 'Ghost'; // Type discriminator
};
type Creature = Animal | Human | Ghost;
```

Now we can perform precise type narrowing based on the discriminator:

```typescript
function logWithMetaData(critter: Creature) {
  console.log(critter.name);

  switch (critter.type) {
    case 'Ghost':
      console.log(`Ghost color: ${critter.colour}`);
      break;
    case 'Human':
      console.log(`Human age: ${critter.age}`);
      break;
    case 'Animal':
      console.log(`Animal prey: ${critter.prey}`);
      break;
  }
}
```

This pattern is far more powerful than C#'s type checking because TypeScript's type system can automatically narrow the variable's type within each case. The compiler understands that a creature with `type: 'Ghost'` must be a `Ghost`, giving you type-safe access to all `Ghost`-specific properties without explicit casting.

## C# vs TypeScript: A Side-by-Side Comparison

Let's compare how we'd handle similar scenarios in both languages:

**C# approach:**

```csharp
// C# implementation
interface ICreature {
    string Name { get; }
}

class Animal : ICreature {
    public string Name { get; set; }
    public string Prey { get; set; }
    public int SleepHours { get; set; }
}

class Human : ICreature {
    public string Name { get; set; }
    public int Age { get; set; }
}

class Ghost : ICreature {
    public string Name { get; set; }
    public string Colour { get; set; }
}

void ProcessCreature(ICreature creature) {
    Console.WriteLine(creature.Name);

    // Approach 1: Type checking with pattern matching (C# 7.0+)
    switch (creature) {
        case Ghost ghost:
            Console.WriteLine($"Ghost color: {ghost.Colour}");
            break;
        case Human human:
            Console.WriteLine($"Human age: {human.Age}");
            break;
        case Animal animal:
            Console.WriteLine($"Animal prey: {animal.Prey}");
            break;
    }

    // Approach 2: Type checking with is operator
    if (creature is Ghost ghost2) {
        Console.WriteLine($"Ghost color: {ghost2.Colour}");
    } else if (creature is Human human2) {
        Console.WriteLine($"Human age: {human2.Age}");
    } else if (creature is Animal animal2) {
        Console.WriteLine($"Animal prey: {animal2.Prey}");
    }
}
```

**TypeScript approach:**

```typescript
// TypeScript implementation with discriminated unions
type Animal = {
  name: string;
  prey: string;
  sleepHours: number;
  type: 'Animal';
};
type Human = {
  name: string;
  age: number;
  type: 'Human';
};
type Ghost = {
  name: string;
  colour: 'red' | 'blue';
  type: 'Ghost';
};
type Creature = Animal | Human | Ghost;

function processCreature(creature: Creature) {
  console.log(creature.name);

  switch (creature.type) {
    case 'Ghost':
      console.log(`Ghost color: ${creature.colour}`);
      break;
    case 'Human':
      console.log(`Human age: ${creature.age}`);
      break;
    case 'Animal':
      console.log(`Animal prey: ${creature.prey}`);
      break;
  }
}
```

The key difference? In C#, we need explicit casts or pattern matching to access type-specific properties. In TypeScript, the compiler automatically narrows the type within the conditional block based on property checks or discriminator values.

## Real-World Example: API Response Handling

Consider a real-world scenario of handling different API response types:

```typescript
// API response types
type SuccessResponse = {
  status: 'success';
  data: {
    userId: number;
    username: string;
    email: string;
  };
};

type ErrorResponse = {
  status: 'error';
  error: {
    code: number;
    message: string;
  };
};

type LoadingResponse = {
  status: 'loading';
};

type ApiResponse = SuccessResponse | ErrorResponse | LoadingResponse;

// Component handling the API response
function UserProfile(props: { response: ApiResponse }) {
  const { response } = props;

  switch (response.status) {
    case 'loading':
      return <div>Loading user data...</div>;

    case 'error':
      return (
        <div className="error">
          Error {response.error.code}: {response.error.message}
        </div>
      );

    case 'success':
      const { userId, username, email } = response.data;
      return (
        <div className="user-profile">
          <h2>{username}</h2>
          <p>User ID: {userId}</p>
          <p>Email: {email}</p>
        </div>
      );
  }
}
```

This pattern enables concise, type-safe handling of different response scenarios without explicit type assertions or complex conditional logic.

## Performance Implications

A common concern for C# developers moving to TypeScript is performance impact. Good news: type narrowing has virtually no runtime cost! TypeScript's type system operates entirely at compile time, and the emitted JavaScript contains only the necessary runtime checks (like `if` statements or `switch` cases) that you explicitly write.

```typescript
// TypeScript with type narrowing
function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}

// Compiled JavaScript - identical runtime behavior to hand-written JS
function processValue(value) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value.toFixed(2);
  }
}
```

The TypeScript compiler uses the type information to verify correctness but doesn't generate additional runtime code for type checking beyond what you explicitly write.

## Advanced Type Narrowing Techniques

### Exhaustiveness Checking

TypeScript can ensure you've handled all possible types in a union:

```typescript
function processCreature(creature: Creature): void {
  switch (creature.type) {
    case 'Ghost':
      console.log(`Ghost color: ${creature.colour}`);
      break;
    case 'Human':
      console.log(`Human age: ${creature.age}`);
      break;
    case 'Animal':
      console.log(`Animal prey: ${creature.prey}`);
      break;
    default:
      // This function will only be called if we've missed a case
      const exhaustiveCheck: never = creature;
      throw new Error(`Unhandled creature type: ${exhaustiveCheck}`);
  }
}
```

If you add a new type to the `Creature` union but forget to update this function, TypeScript will raise a compile-time error.

### Type Narrowing with Generics

Type narrowing works seamlessly with generics:

```typescript
type Result<T> =
  | { success: true; value: T }
  | { success: false; error: string };

function unwrapResult<T>(result: Result<T>): T {
  if (result.success) {
    return result.value; // TypeScript knows this is the success case
  } else {
    throw new Error(result.error); // TypeScript knows this is the error case
  }
}

// Usage
const userResult: Result<{ name: string; age: number }> = {
  success: true,
  value: { name: 'Alice', age: 30 },
};

const user = unwrapResult(userResult); // Type is {name: string; age: number}
```

### Using Assertion Functions

TypeScript 3.7+ supports assertion functions for custom runtime validation:

```typescript
function assertIsAnimal(creature: Creature): asserts creature is Animal {
  if (!('prey' in creature)) {
    throw new Error('Not an animal!');
  }
}

function feedAnimal(creature: Creature) {
  assertIsAnimal(creature);
  // TypeScript now knows creature is an Animal
  console.log(`Feeding ${creature.name} its favorite prey: ${creature.prey}`);
}
```

## Limitations and Edge Cases

While powerful, type narrowing isn't perfect:

1. **Dynamic properties**: TypeScript can't narrow types based on dynamically accessed properties:

   ```typescript
   function getProperty(obj: Creature, prop: string) {
     return obj[prop]; // Error: Element implicitly has 'any' type
   }
   ```

2. **Complex type relationships**: Very complex unions or deeply nested types can sometimes confuse the compiler.

3. **Third-party libraries**: Library code without proper TypeScript definitions may require explicit type assertions.

4. **Type widening**: TypeScript might "widen" literal types in certain contexts, requiring explicit type annotations.

## Migrating from C# Patterns to TypeScript

When transitioning from C# to TypeScript, consider these pattern migrations:

| C# Pattern       | TypeScript Equivalent                                       |
| ---------------- | ----------------------------------------------------------- |
| `is` operator    | `typeof`, `instanceof`, or custom type guards               |
| Pattern matching | Discriminated unions with `switch`                          |
| Polymorphism     | Interface implementations or duck typing                    |
| `as` casting     | Type assertions (`as` in TypeScript) or type guards         |
| Abstract classes | Abstract classes or interfaces with optional implementation |

## Troubleshooting Common Issues

Here are some common pitfalls and their solutions:

1. **Type guard not narrowing as expected**

   Problem:

   ```typescript
   const creatures: Creature[] = [...];
   const ghost = creatures.find(c => 'colour' in c);
   console.log(ghost.colour);  // Error: Property 'colour' does not exist on type 'Creature'
   ```

   Solution:

   ```typescript
   const ghost = creatures.find((c) => 'colour' in c) as Ghost;
   // or better:
   const ghost = creatures.find((c): c is Ghost => 'colour' in c);
   ```

2. **Narrowing lost after reassignment**

   Problem:

   ```typescript
   let creature: Creature = { type: 'Ghost', name: 'Casper', colour: 'blue' };
   if (creature.type === 'Ghost') {
     let narrowed = creature;
     // Inside another function:
     setTimeout(() => {
       console.log(creature.colour); // Error: Property 'colour' does not exist on type 'Creature'
     }, 1000);
   }
   ```

   Solution: Capture the narrowed type inside the closure:

   ```typescript
   if (creature.type === 'Ghost') {
     const ghost = creature; // Narrowed type
     setTimeout(() => {
       console.log(ghost.colour); // Works fine
     }, 1000);
   }
   ```

3. **Using type predicates correctly**

   Problem:

   ```typescript
   // Incorrect type predicate
   function isGhost(creature: Creature): boolean {
     return 'colour' in creature;
   }

   const creature: Creature = { type: 'Ghost', name: 'Casper', colour: 'blue' };
   if (isGhost(creature)) {
     console.log(creature.colour); // Error: Property 'colour' does not exist on type 'Creature'
   }
   ```

   Solution:

   ```typescript
   // Correct type predicate
   function isGhost(creature: Creature): creature is Ghost {
     return 'colour' in creature;
   }

   if (isGhost(creature)) {
     console.log(creature.colour); // Works fine
   }
   ```

## Conclusion

TypeScript's type narrowing is one of its most powerful features that truly sets it apart from C#'s more rigid type system. The ability to intelligently narrow types based on runtime checks without explicit casts creates code that is both more flexible and safer. For C# developers transitioning to TypeScript, mastering type narrowing is key to writing idiomatic, type-safe TypeScript code.

While there's a learning curve, the payoff is significant: more concise code, fewer runtime errors, and more expressive APIs. By leveraging discriminated unions and the various type guards that TypeScript offers, you can create robust applications that harness the flexibility of JavaScript while maintaining the type safety you're accustomed to in C#.

Remember, effective TypeScript development doesn't mean trying to force C# patterns into JavaScript; it means embracing TypeScript's structural typing system and the unique capabilities it offers. Type narrowing is at the heart of this approach, enabling patterns that simply aren't possible in nominally typed languages like C#.
