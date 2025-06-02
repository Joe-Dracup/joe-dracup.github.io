---
date: 2025-05-29
title: Exceptions the Abstract - When and How?
---

Throwing and catching exceptions is easy in most languages, but when you are learning how to code no one really talks about the abstract - how, when and why should you throw or handle exceptions to improve your applications.

## Types of Exception

[Vexing Exceptions](https://ericlippert.com/2008/09/10/vexing-exceptions/){ target="_blank" } by Eric Lippert defines four types of exceptions, I'll go over them here and discuss how to handle them.

### Fatal Exceptions

Examples:
```
OutOfMemoryException
StackOverflowException
```

Fatal exceptions are exceptions that are going to break your application (it's kind of in the name).

They are hard to predict when they are going to happen, as they could happen at different times depending on the environment.

They are also hard to clean up from so dont try and catch them manually.

When these are thrown, just let the app crash.

### Boneheaded Exceptions

Examples: 
```
ArgumentException 
IndexOutOfRangeException
```

Boneheaded exceptions are exceptions that are caused by missusing code. They are typically a sign of a bug and so should be left unhandled.

When writing code that is going to be re-used make sure to throw boneheaded exceptions to prevent this code from being re-used incorrecrtly. ArgumentExceptions should be used to ensure that the arguments provided are going to provide the expected results and should be preferred over defaulting missing or mal-formed arguments as this could look right when calling the code, but produce effects that dont match what the user sees.

A boneheaded exception is preferable to this as you will quickly identify the source of the issue, and not cause hard to find bugs in your application.

```typescript
// Example 1 - the wrong way 
function saveSomething(item: ObjectToSave) {
  if (item) {
    save()
  }
}

// Example 2 - the better way
function saveSomething(item: ObjectToSave) {
  if (!item) {
    throw new Error("ArgumentException: saveSomething requires an item to save, nothing was provided.");
  }
  save()
}
```

In the first typescript example above the function will do nothing if the item provided to it has no value, this is not immediately obvious to any calling code and could be hard to debug.

In the second example it is immediately obvious that this has been called with the wrong values when the calling function propagates the error up the call stack. 

For this reason you should not try and handle boneheaded exceptions with catch blocks. These should be allowed to fail so that the bug they are preventing can be fixed early before this reaches production.

Overall boneheaded exceptions should be treated as a gift, they are pointing out that you have done something silly, and giving you pointers around where to fix this.

### Vexing Exceptions

Examples:
```
FormatExceptions
```

Vexing exceptions are symptoms of poor API design, you should not write code that ever throws vexing exceptions.

The classic example is the `Int32.Parse` function from C# that throws if the string trying to be converted to an int is in the wrong format.

The main use case for this is to transform user input into an int that can be used in your programs logic, however this could be anything, and you cannot tell beforehand without implementing the whole parse function for yourself.

This instead should be avoided for the `Int32.TryParse` function which will not throw the vexing exception, and instead informs you whether the format is correct without throwing an exception.

```csharp

string userInput = "blah";

// Example 1 - the wrong way 
try
{
    var parsedInput = Int32.Parse(userInput);
    Console.WriteLine(parsedInput);
}
catch(FormatException e) 
{
    Console.WriteLine(e);
}

// Example 2 - the better way 
if(Int32.TryParse(userInput, out int tryParsedInput))
{
    Console.WriteLine(tryParsedInput);
}
else
{
    Console.WriteLine("Failed Try Parse");	
}
```

In the above C# examples, it is not immediately obvious that the Parse function will cause an error, however it is clear by the method signature that TryParse may or may not actually parse the input and so developers calling this code will by default handle the case that this fails.

Using the `TryParse` function over throwing an exception to control the flow of the application is good, but in modern development I would say to look at using the result pattern to explicitly show the caller of your code that this actioin may fail.

### Exogenous Exceptions

Examples: 
```
FileNotFound
ResourceUnavailable
```

Exogenous exceptions are exceptions that occur outside of the scope of your application, these are hard to predict and prevent as with things like accessing files on your machine the point in time that you check for its existence is not the time that you attempt to read from the file and something could delete it between these points.

You should not try and prevent these, and instead should just allow them to fail. Don't try and swallow exogenous exceptions, instead allow these to propagate up your architecture and handle them high in the stack.

## Overall

Looking back at the four types of exceptions, it makes sense that most of these should not really be caught deep in the application, and should be handled closer to your UI layer.

You should ensure that you are throwing boneheaded exceptions where appropriate to avoid issues that are not immediately obvious.
