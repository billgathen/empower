export default function Success({ config }) {
  const change = (value: string) => {
    config.updateSuccess(config.selectedGoalIndex, value);
  }

  return <section id="success" aria-labelledby="success-heading">
    <h2 id="success-heading">Success Criteria</h2>
    <label htmlFor="goal-label" className="goal-label">Goal</label>
  </section>
}
