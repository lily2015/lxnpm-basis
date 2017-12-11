export class HelperTask {
  public static taking() {
    const now = new Date();
    const taking = now.getTime() - HelperTask.prevDateTime.getTime();
    HelperTask.prevDateTime = now;
    return `${taking / 1000} s`;
  }
  private static prevDateTime = new Date();
}
