using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Diagnostics;


public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod]
    public static String SubmitPoll(String[] data)
    {
      
        //first key will be the poll id followed by a dictionary of the poll question and answers indexed 0-4
        Dictionary<int, Dictionary<int, String>> allPolls = new Dictionary<int, Dictionary<int, string>>();
        Dictionary<int, String> currPoll = new Dictionary<int, string>();
        Dictionary<int, Dictionary<int, int>> results = new Dictionary<int, Dictionary<int, int>>();
        Dictionary<int, int> answerCounts = new Dictionary<int, int>();

        int pollID;
        int pollCount;
        int i = 0;
        int maxSize = 100;

        //pull the current polls from the application state
        HttpContext.Current.Application.Lock();
        allPolls = (Dictionary<int, Dictionary<int, String>>)HttpContext.Current.Application["Polls"];
        results = (Dictionary<int, Dictionary<int, int>>)HttpContext.Current.Application["Responses"];

        try
        {

            //get the question and answer from the data file
            foreach (String pollInfo in data)
            {
                //only add the answer if the user entered one
                if (pollInfo != "")
                {
                    currPoll.Add(i, pollInfo);
                    i++;
                }
            }

            pollCount = (int)HttpContext.Current.Application["PollCount"];

            //if we have reached our maximum size, remove the oldest entry
            if (pollCount >= maxSize)
            {
                pollID = pollCount % maxSize;
                allPolls.Remove(pollID);
                results.Remove(pollID);
                allPolls[pollID] = currPoll;
            }
            else
            {
                pollID = pollCount;
                allPolls.Add(pollID, currPoll);
            }

            for (i = 1; i <= currPoll.Count() - 1; i++)
            {
                answerCounts.Add(i - 1, 0);
            }

            results.Add(pollID, answerCounts);

            HttpContext.Current.Application["Responses"] = results;
            HttpContext.Current.Application["Polls"] = allPolls;
            HttpContext.Current.Application["PollCount"] = pollCount + 1;
            HttpContext.Current.Application.UnLock();
            return pollID.ToString();
        }
        catch
        {
            return "-1";
        }
    }

    [WebMethod]
    public static String[] GetPollData(int data)
    {
        Dictionary<int, Dictionary<int, String>> allPolls = new Dictionary<int, Dictionary<int, string>>();
        Dictionary<int, String> currPoll = new Dictionary<int, string>();
        List<String> pollData = new List<String>();
        int i = 0;
        int count = 0;
        HttpContext.Current.Application.Lock();
        allPolls = (Dictionary<int, Dictionary<int, String>>)HttpContext.Current.Application["Polls"];
        try
        {
            currPoll = allPolls[data];
            count = currPoll.Count;
            pollData.Add(data.ToString());
            for (i = 0; i < count; i++)
            {
                pollData.Add(currPoll[i]);
            }
            HttpContext.Current.Application.UnLock();
            return pollData.ToArray();
        }
        catch
        {
            pollData.Add("-1");
            return pollData.ToArray();
        }
    }

    [WebMethod]
    public static int SubmitAnswer(String pollID, int qid)
    {
       
        int pid = Convert.ToInt32(pollID);
        int answerCount = 0;
        Dictionary<int, Dictionary<int, int>> pollStats = new Dictionary<int, Dictionary<int, int>>();

        try
        {
            HttpContext.Current.Application.Lock();
            pollStats = (Dictionary<int, Dictionary<int, int>>)HttpContext.Current.Application["Responses"];
            answerCount = pollStats[pid][qid];
            answerCount++;
            pollStats[pid][qid] = answerCount;
            HttpContext.Current.Application["Responses"] = pollStats;
            HttpContext.Current.Application.UnLock();
            return 1;
        }
        catch
        {
            return -1;
        }
    }

    [WebMethod]
    public static int[] getResponses(int pid)
    {
      
        List<int> responses = new List<int>();
        int count;
        int i;
        Dictionary<int, Dictionary<int, int>> pollStats = new Dictionary<int, Dictionary<int, int>>();
        Dictionary<int, int> selectedPoll = new Dictionary<int, int>();

        try
        {
            HttpContext.Current.Application.Lock();
            pollStats = (Dictionary<int, Dictionary<int, int>>)HttpContext.Current.Application["Responses"];
            selectedPoll = pollStats[pid];

            count = selectedPoll.Count();
            for (i = 0; i < count; i++)
            {
                responses.Add(selectedPoll[i]);
            }
            HttpContext.Current.Application.UnLock();
            return responses.ToArray();
        }
        catch
        {
            responses.Add(-1);
            return responses.ToArray();
        }
    }

    [WebMethod]
    public static int editPoll(int id, String[] info)
    {
        int i = 0;
        Dictionary<int, Dictionary<int, String>> allPolls = new Dictionary<int, Dictionary<int, string>>();
        Dictionary<int, String> currPoll = new Dictionary<int, string>();
        Dictionary<int, Dictionary<int, int>> results = new Dictionary<int, Dictionary<int, int>>();
        Dictionary<int, int> answerCounts = new Dictionary<int, int>();

        try
        {
            HttpContext.Current.Application.Lock();
            allPolls = (Dictionary<int, Dictionary<int, String>>)HttpContext.Current.Application["Polls"];
            results = (Dictionary<int, Dictionary<int, int>>)HttpContext.Current.Application["Responses"];

            //get the question and answer from the data file
            foreach (String pollInfo in info)
            {
                //only add the answer if the user entered one
                if (pollInfo != "")
                {
                    currPoll.Add(i, pollInfo);
                    i++;
                }
            }

            //replace the old version of the poll
            allPolls.Remove(id);
            allPolls.Add(id, currPoll);

            //reset the counters for that poll
            for (i = 1; i <= currPoll.Count() - 1; i++)
            {
                answerCounts.Add(i - 1, 0);
            }
            results.Remove(id);
            results.Add(id, answerCounts);

            //set the application variables
            HttpContext.Current.Application["Responses"] = results;
            HttpContext.Current.Application["Polls"] = allPolls;
            HttpContext.Current.Application.UnLock();

            return 1;
        }
        catch
        {
            return -1;
        }
    }
    
}