import { Link } from "react-router-dom";

export const gameDescriptions = {
  reactiontime: (
    <>
      This is a simple tool to measure your reaction time.
      <br />
      <br />
      The average (median) reaction time is 273 milliseconds, according to{" "}
      <span className="text-light-blue">the data</span> collected so far.
      <br />
      <br />
      In addition to measuring your reaction time, this test is affected by the
      latency of your computer and monitor. Using a fast computer and low
      latency / high framerate monitor will improve your score.
      <br />
      <br />
      Scores in this test are faster than the{" "}
      <span className="text-light-blue">
        <Link to="/test/aimtrainer">aim trainer</Link>
      </span>{" "}
      test, because you can react instantly without moving the cursor.
      <br />
      <br />
      This is discussed in further detail on the the{" "}
      <span className="text-light-blue">statistics</span> page. While an average
      human reaction time may fall between 200-250ms, your computer could be
      adding 10-50ms on top. Some modern TVs add as much as 150ms!
      <br />
      <br />
      Other tools:
      <a
        className="text-light-blue"
        target="blank"
        href="https://hardwaretester.com/gpu"
      >
        What's My GPU?
      </a>
      <br />
      <br />
      If you want, you can keep track of your scores, and see your full history
      of reaction times. Just perform at least 5 clicks and then save.
    </>
  ),
  sequencememory: (
    <>
      Memorize the sequence of buttons that light up, then press them in order.
      <br />
      <br />
      Every time you finish the pattern, it gets longer.
      <br />
      <br /> Make a mistake, and the test is over.
    </>
  ),
  aimtrainer: (
    <>
      Click the targets as quickly and accurately as you can.
      <br />
      <br />
      This tests reflexes and hand-eye coordination.
      <br />
      <br />
      Once you've clicked 30 targets, your score and average time per target
      will be displayed.
      <br />
      <br />
      Scores in this test are slower than the simple reaction time test, because
      you must react and then move the cursor.
      <br />
      <br />
      This test is best taken with a mouse or tablet screen. Trackpads are
      difficult to score well with.
    </>
  ),
  numbermemory: (
    <>
      The average person can only remember 7 digit numbers reliably, but it's
      possible to do much better using mnemonic techniques. Some helpful links
      are provided below.
      <br />
      <br />
      <span className="text-light-blue">Mnemonic major system</span>
      <br />
      <br />
      <span className="text-light-blue">Dominic system</span>
      <br />
      <br />
      <span className="text-light-blue">Katapayadi system</span>
      <br />
      <br />
      <span className="text-light-blue">Mnemonic devices</span>
    </>
  ),
  verbalmemory: (
    <>
      This test measures how many words you can keep in short term memory at
      once.
      <br />
      <br />
      The number of words you need to remember grows continually, until you
      can't keep them in your head anymore.
      <br />
      <br />
      Go as long as you can. You have 3 strikes until game over.
      <br />
      <br />
      Your score is how many turns you lasted.
    </>
  ),
  chimptest: (
    <>
      This is a test of working memory, made famous by a study that found that
      chimpanzees consistently outperform humans on this task.
      <br />
      <br />
      In the study, the chimps consistently outperformed humans, and some chimps
      were able to remember 9 digits over 90% of the time.
      <br />
      <br />
      This test is a variant of that concept, that gets increasingly difficult
      every turn, starting at 4 digits, and adding one every turn. If you pass a
      level, the number increases. If you fail, you get a strike. Three strikes
      and the test is over.
      <br />
      <br />
      <span className="text-light-blue">Youtube: Chimp vs Human!</span>
    </>
  ),
  visualmemory: (
    <>
      Every level, a number of tiles will flash white. Memorize them, and pick
      them again after the tiles are reset!
      <br />
      <br />
      Levels get progressively more difficult, to challenge your skills.
      <br />
      <br />
      If you miss 3 tiles on a level, you lose one life.
      <br />
      <br />
      You have three lives.
      <br />
      <br />
      Make it as far as you can!
    </>
  ),
  typing: (
    <>
      This is a simple test of typing speed, measuring words per minute, or WPM.
      <br />
      <br />
      The standard measure of WPM is (number of characters / 5) / (time taken).
      By that measurement, "quick brown fox" is 15 characters, including spaces.
      <br />
      <br />
      The recorded score is WPM * Accuracy.
    </>
  ),
};
