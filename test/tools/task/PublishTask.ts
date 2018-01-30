import * as Tape from "blue-tape";
import * as fs from "fs-extra";
import { PublishTask } from "../../../tools/task/PublishTask";

Tape("PublishTask", async () => {
  await new PublishTask().start();
});
