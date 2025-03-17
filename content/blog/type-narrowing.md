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
  console.log(critter.colour); // Error: Property 'colour' doesn't exist on ALL types that make up type 'Creature'
}
```

This is where TypeScript's type narrowing becomes essential. Let's explore the various techniques available.

## Type Guards: The Full Arsenal

### Type Checks with 'typeof'

For primitive types, `typeof` provides narrowing, as TypeScript Types do not exist at runtime this is harder to do for objects as `typeof` will just return that this is an `object`:

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

For class instances, using the `instanceof` operator will check whether or not this is an instance of that class type. Its important to note that this will only work for classes, and will not work for objects that are typed using TypeScript features.

This is because TypeScript is compiled into plain JavaScript, and so typed objects as defined above will not exist at runtime and so cannot be checked with instance of.

I rarely use JavaScript classes and so don't use this regularly.

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

### Property Checks with 'in'

One way of type narrowing for Typed objects is using the `in` operator. This will check whether or not the object being passed in contains a property with the name specified.

The TypeScript compiler can then narrow down the unioned type down to only the type that contains this property

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

A common concern for C# developers moving to TypeScript is performance impact. Good news: type narrowing has virtually no runtime cost! Because TypeScript's type system operates entirely at compile time, and the emitted JavaScript contains only the necessary runtime checks (like `if` statements or `switch` cases) that you explicitly write.

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

## Conclusion

TypeScript's type narrowing system provides powerful tools for ensuring code reliability at runtime. However, it's crucial to remember that TypeScript types are compile-time constructs that don't exist during execution. Therefore, the narrowing techniques discussed above must be implemented thoughtfully and appropriately to achieve their intended benefits and prevent potential runtime errors.
