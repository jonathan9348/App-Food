export default function validation(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.summary) {
    errors.summary = "Hey! make the description";
  }
  if (!input.healthScore) {
    errors.healthScore = "Hey! Don't forget the score";
  }

  return errors;
}
