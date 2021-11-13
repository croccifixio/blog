+++
date = 2020-09-27
title = "Form Validation with TypeScript and&nbsp;Zod"
path = "form-validation-with-typescript-and-zod"
[taxonomy]
tags = ["react", "typescript", "zod"]
[extra]
description = [
  "TypeScript offers the ability to pepper one's code with type annotations, allowing the compiler to perform type checks and the language server to provide code completion. These all add up to an improved developer experience, but much of the benefits are thrown out the window once the code is shipped and running out in the wild. While TypeScript may encourage writing safer code that handles edge cases better, there are times when the need to perform runtime validations of values with non-trivial structures arises. This is typically the case when handling input from external sources, be that receiving a response from an API or from a user filling in a form."
]
seo_title = "Form Validation with TypeScript and Zod"
+++

TypeScript offers the ability to pepper one's code with type annotations, allowing the compiler to perform type checks and the language server to provide code completion. These all add up to an improved developer experience, but much of the benefits are thrown out the window once the code is shipped and running out in the wild. While TypeScript may encourage writing safer code that handles edge cases better, there are times when the need to perform runtime validations of values with non-trivial structures arises. This is typically the case when handling input from external sources, be that receiving a response from an API or from a user filling in a form.

This article will focus on form validation in React, but the same concepts can be applied to other frameworks (or lack thereof), and even to other use cases such as validating API responses or performing crude pattern matching.

Consider a form that asks a user for the following information:

- Name
- Email
- Favourite number
- Favourite colour

In TypeScript we may define a type that expresses the valid values of our form as follows:

```ts
type TForm = {
  firstName: string;
  email: string;
  favouriteNumber: number;
  favouriteColour: "blue" | "not blue";
}
```

For the time being, let's gloss over the fact that the type `string` is not nearly restrictive enough for an email. We may be tempted to say the same thing about the first name, but [names are not as simple to categorise as societal norms may suggest](https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/).

Some form libraries such as `react-use-form-state` can make use of the above type to make type inferences, which is really useful. In the below example, `formState.values` not only mirrors the shape of `TForm`, but also infers the type of each field:

```tsx
const [formState] = useFormState<TForm>();
formState.values.favouriteNumber // infers the type `number`
```

So what happens when the user fills in the form and clicks the submit button? Ideally, we would validate the form data first, informing the user if anything needs to be corrected. Unfortunately, TypeScript isn't going to be of much help here.

We'll need to write some validation checks, which usually end up more or less expressing the TypeScript type, except in the form of code. This kind of repetition may seem trivial when the TypeScript types match up with the built in JavaScript types; this is the case with `string` and `number`. But once we start dealing with more complex types, such as a string that matches a regex pattern or an array of predefined strings, the checks we need to perform begin to resemble the TypeScript types less and less.

A myriad of switch or if-else blocks seems like the way forward, but to make life easier for ourselves, we can make use of a validation library such as `zod`, to reduce cognitive overhead of defining these validation checks. The `zod` schema for the same form is shown below:

```ts
import * as z from "zod"

const formSchema = z.object({
  firstName: z.string(),
  email: z.string().email(),
  favouriteNumber: z.number(),
  favouriteColour: z.enum(["blue", "not blue"]),
})
```

This looks reasonably nice. `formSchema` resembles `TForm` pretty closely. `zod` even provides a convenient `email()` method that saves us the trouble of searching for an email regex to use. In our submit handler, we can check to see if `formState.values` matches the schema we defined using `zod`.

```tsx
const handleSubmit: React.FormEventHandler = (event) => {
  event.preventDefault()
  try {
    formSchema.parse(formState.values)
  } catch(error) {
    if (error instanceof z.ZodError) {
      /* map zod errors to the appropriate form fields */
      return
    }
  }
  /* submit the form to the backend */
}
```

To recap, we have `TForm` &mdash; a type that we have defined in TypeScript &mdash; which gives us the advantage of type inference and code completion. We also have `formSchema` &mdash; a "type" that we have defined using `zod` &mdash; which allows us to conveniently validate the form at runtime and comes with error message built in. This is what they look like next to each other:

```ts
type TForm = {
  firstName: string;
  email: string;
  favouriteNumber: number;
  favouriteColour: "blue" | "not blue";
}
const formSchema = z.object({
  firstName: z.string(),
  email: z.string().email(),
  favouriteNumber: z.number(),
  favouriteColour: z.enum(["blue", "not blue"]),
})
```

The similarity is glaringly obvious. While this is a step in the right direction, especially considering that the alternative would probably be much less concise and involve littering our code with if statements, something feels off (if it doesn't, I'm gently hinting that it should). Why do we need write out the "same type" twice using different syntaxes? Wouldn't it be great if we only had to write the "type" a single time using one approach and have the other inferred from the first?

I don't know of any tool that would allow us to pass a TypeScript type and get back a `zod` schema. Such a tool would need a way for us to tell it that the `email` field should be validated against a regex pattern, perhaps through a magic comment. This is likely possible to implement as an extension to an IDE, but as it turns out, if we reverse our thinking and instead try and infer the TypeScript type from the `zod` schema, then the problem has already been solved for us through `zod`'s `infer` method.

```ts
const formSchema = z.object({
  firstName: z.string(),
  email: z.string().email(),
  favouriteNumber: z.number(),
  favouriteColour: z.enum(["blue", "not blue"]),
})
type TForm = z.infer<typeof formSchema>
```

We now have a single source of truth that defines what our form should look like. The `zod` schema is useful for validating the form data, and we still get to keep all the benefits of having defined the form's type in TypeScript.

We end up with a form component that looks as follows:

```tsx
import React, { FC, FormEventHandler } from "react"
import { useFormState } from "react-use-form-state"
import * as z from "zod"

const formSchema = z.object({
  firstName: z.string(),
  email: z.string().email(),
  favouriteNumber: z.number(),
  favouriteColour: z.enum(["blue", "not blue"]),
})
type TForm = z.infer<typeof formSchema>

const Form: FC = () => {
  const [formState, { number, text }] = useFormState<TForm>()

  const handleErrors = (errors: { [k: string]: string[] }): void => {
    const invalidFields = Object.keys(errors) as Array<keyof TForm>
    invalidFields.forEach(field =>
      formState.setFieldError(field, errors[field].join("; "))
    )

    const validFields = (Object.keys(formState.values) as Array<keyof TForm>)
      .filter(field => !invalidFields.includes(field))
    validFields.forEach(field =>
      formState.setFieldError(field, null)
    )
  }

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault()
    try {
      formSchema.parse({
        ...formState.values,
        favouriteNumber: parseInt(formState.values.favouriteNumber),
      })
      handleErrors({})
    } catch (error) {
      if (error instanceof z.ZodError) {
        handleErrors(error.flatten().fieldErrors)
        return
      }
    }
    /* submit the form to the backend */
  }

  const validateField = (field: keyof TForm) =>
    (value: unknown): string => {
      const parsedResult = formSchema
        .pick({ [field]: true })
        .safeParse({ [field]: value })
      return !parsedResult.success
        ? parsedResult.error.errors[0].message
        : ""
    }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          First name
          <input
            {...text({
              name: "firstName",
              validate: validateField("firstName"),
            })}
          />
        </label>
        <p>{formState.errors.firstName}</p>
      </div>
      <div>
        <label>
          Email
          <input
            {...text({
              name: "email",
              validate: validateField("email"),
            })}
          />
        </label>
        <p>{formState.errors.email}</p>
      </div>
      <div>
        <label>
          Favourite number
          <input
            {...number({
              name: "favouriteNumber",
              validate: value => {
                return validateField("favouriteNumber")(parseInt(value))
              },
            })}
          />
        </label>
        <p>{formState.errors.favouriteNumber}</p>
      </div>
      <div>
        <label>
          Favourite colour
          <input
            {...text({
              name: "favouriteColour",
              validate: validateField("favouriteColour"),
            })}
          />
        </label>
        <p>{formState.errors.favouriteColour}</p>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default Form
```

A few noteworthy amendments have been added to the form that were not previously discussed. The first is that we now have a `handleErrors` function that controls which errors are displayed on the screen. The error messages shown are the defaults that are shipped with `zod`. Although we use the defaults here, [`zod` provides a way to specify custom error messages](https://github.com/vriad/zod/blob/master/ERROR_HANDLING.md#customizing-errors-with-zoderrormap) should we wish to go that route. The `handleErrors` function is called in our submit handler, and conveniently allows us to clear all the errors by passing an empty object as its argument.

```tsx
const handleErrors = (errors: { [k: string]: string[] }): void => {
  const invalidFields = Object.keys(errors) as Array<keyof TForm>
  invalidFields.forEach(field =>
    formState.setFieldError(field, errors[field].join("; "))
  )

  const validFields = (Object.keys(formState.values) as Array<keyof TForm>)
    .filter(field => !invalidFields.includes(field))
  validFields.forEach(field =>
    formState.setFieldError(field, null)
  )
}
```

The `formState` object returned by the `useFormState` hook has its own built-in error messages. These error messages are inferred from the TypeScript type that we provide when we call `useFormState<TForm>`. This is not ideal for 2 reasons. Firstly, the wording will be different from `zod`'s error messages. Secondly, `zod` has stricter checks (remember the email regex?). As an example, `formState.errors.email` will be empty even for an invalid email. To get around this issue we create a `validateField` function that makes the form state use `zod`'s validation checks as well as its error messages. We also use two new methods provided by `zod`: `pick` and `safeParse`. `pick` allows us to select only the fields we are interested in based on an existing schema. `safeParse` like `parse`, compares the values passed to it against the schema. The difference being that `safeParse` does not throw when validation errors occur.

```tsx
const validateField = (field: keyof TForm) =>
  (value: unknown): string => {
    const parsedResult = formSchema
      .pick({ [field]: true })
      .safeParse({ [field]: value })
    return !parsedResult.success
      ? parsedResult.error.errors[0].message
      : ""
  }
```

In addition to the `formState` object, `useFormState` also returns some input functions that apply the HTML `type` and `name` attributes. These input functions accept a validate function that returns the error message if any. This is where we'll plug in our `validateField` function to ensure that we are using the validation rules and error messages provided by `zod` instead of those provided by `react-use-form-state`.

```tsx
<input
  {...text({
    name: "email",
    validate: validateField("email"),
  })}
/>
```

The above snippet is roughly equivalent to the following:

```tsx
<input
  name="email"
  onChange={(event): void => {
    formState.setFieldError(
      "email",
      validateField("email")(event.currentTarget.value),
    )
  }}
  type="text"
/>
```

Once the custom validation rules are in place, we need a way of displaying the error messages. We can lightly modify the JSX so that error messages are displayed next to their corresponding field.

```tsx
<label>
  Email
  <input
    {...text({
      name: "email",
      validate: validateField("email"),
    })}
  />
</label>
<p>{formState.errors.email}</p>
```

Finally, we make sure to call `parseInt` whenever we want to check if the value of `favouriteNumber` matches the schema. This is unavoidable since even though the field has an attribute of `type="number"`, which is implied by calling `{...number({ // ... })}`, the browser will always return a string value. A string would automatically fail to meet the criteria defined in our schema: `z.number()`.

```tsx
const handleSubmit: FormEventHandler = event => {
  /* ... */
  formSchema.parse({
    ...formState.values,
    favouriteNumber: parseInt(formState.values.favouriteNumber),
  })
  /* ... */
}

return (
  {/* ... */}
  <label>
    Favourite number
    <input
      {...number({
        name: "favouriteNumber",
        validate: value => {
          return validateField("favouriteNumber")(parseInt(value))
        },
      })}
    />
  </label>
  {/* ... */}
)
```

Here is a [running example of the form](https://zod.croccifix.io) described in this post.
