import React, { Component } from 'react';
import axios from 'axios';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

class WordFrequencyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCount: [],
      loading: false,
      error: false,
    };
  }

  handleClick = async () => {
    this.setState({ loading: true });

    try {
      const response = await axios.get(
        'https://www.terriblytinytales.com/test.txt'
      );
      const text = response.data;
      const words = text.toLowerCase().split(/\W+/);
      const wordCount = words.reduce((map, word) => {
        if (!map[word]) {
          map[word] = 1;
        } else {
          map[word] += 1;
        }
        return map;
      }, {});

      const sortedWordCount = Object.entries(wordCount).sort(
        (a, b) => b[1] - a[1]
      );

      this.setState({
        wordCount: sortedWordCount.slice(0, 20),
        loading: false,
        error: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { wordCount, loading, error } = this.state;

    const labels = wordCount.map((item) => item[0]);
    const data = wordCount.map((item) => item[1]);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Word Frequency',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderWidth: 1,
        },
      ],
    };

    const csvData = wordCount.map((item) => ({
      Word: item[0],
      Frequency: item[1],
    }));

    return (
      <div>
        {wordCount.length > 0 && (
          <div>
            <CSVLink data={csvData} filename="word_frequency.csv">
              <button
                style={{
                  marginBottom: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#4bc0c0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Export CSV
              </button>
            </CSVLink>
            <h2>Word Frequency Count:</h2>
            <Bar data={chartData} />
          </div>
        )}

        <button
          onClick={this.handleClick}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4bc0c0',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? '0.7' : '1',
          }}
        >
          {loading ? 'Loading...' : 'Generate Word Frequency'}
        </button>

        {error && <div>Error fetching data.</div>}
      </div>
    );
  }
}

export default WordFrequencyCounter;
