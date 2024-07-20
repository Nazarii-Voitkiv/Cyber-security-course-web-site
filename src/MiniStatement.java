import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.ResultSet;

public class MiniStatement extends JFrame implements ActionListener {
    private static final int FRAME_WIDTH = 400;
    private static final int FRAME_HEIGHT = 600;
    String pinNumber;
    JLabel transactionsLabel, cardNumberLabel, balanceLabel;
    JButton backButton;
    CreateComponents components;
    MiniStatement(String pinNumber) {
        components = new CreateComponents();
        this.pinNumber = pinNumber;

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(null);
        setTitle("Mini Statement");
        getContentPane().setBackground(Color.white);
        setSize(FRAME_WIDTH,FRAME_HEIGHT);
        addComponents();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void addComponents() {
        addBank();
        addTransactionsLabel();
        addCardNumberLabel();
        addBalanceLabel();
        showCardNumber();
        showTransactions();
        addBackButton();
    }

    private void addTransactionsLabel() {
        transactionsLabel = components.createLabel("",20,140,400,200,13);
        add(transactionsLabel);
    }

    private void addBank() {
        JLabel americanBankLabel = components.createLabel("American Bank",140,20,200,20,16);
        add(americanBankLabel);
    }

    private void addCardNumberLabel() {
        cardNumberLabel = components.createLabel("",20,80,300,20,16);
        add(cardNumberLabel);
    }

    private void addBalanceLabel() {
        balanceLabel = components.createLabel("",20,400,300,20,16);
        add(balanceLabel);
    }

    private void showCardNumber() {
        try {
            Conn conn = new Conn();
            ResultSet rs = conn.s.executeQuery("select * from login where pin = '"+ pinNumber +"'");
            while (rs.next()) {
                cardNumberLabel.setText("Card Number:    " + rs.getString("cardnumber").substring(0, 4) + "XXXXXXXX" + rs.getString("cardnumber").substring(12));
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private void addBackButton() {
        backButton = components.createButton("Back",125,500,150,30,14);
        backButton.addActionListener(this);
        add(backButton);
    }

    private void showTransactions() {
        try {
            Conn conn = new Conn();
            int balance = 0;
            ResultSet rs = conn.s.executeQuery("select * from bank where pin = '"+ pinNumber +"'");
            while (rs.next()) {
                transactionsLabel.setText(transactionsLabel.getText() + "<html>"+rs.getString("date")+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + rs.getString("type") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + rs.getString("amount") + "<br><br><html>");
                if (rs.getString("type").equals("Deposit")) {
                    balance += Integer.parseInt(rs.getString("amount"));
                } else {
                    balance -= Integer.parseInt(rs.getString("amount"));
                }
            }
            balanceLabel.setText("Your Current Account Balance is $"+balance);
        } catch (Exception e) {
            System.out.println(e);
        }
    }


    @Override
    public void actionPerformed(ActionEvent e) {
        setVisible(false);
        new Transactions(pinNumber).setVisible(true);
    }

    public static void main(String[] args){
        new MiniStatement("");
    }
}
